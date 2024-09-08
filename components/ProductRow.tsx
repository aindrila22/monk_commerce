"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setProducts } from "@/redux/productSlice";
import {
  addSelectedProducts,
  removeVariant,
} from "@/redux/selectedProductSlice";
import ProductItem from "./ProductItem";

const ProductRow = ({ id }: any) => {
  const dispatch = useDispatch();
  const isDiscountAdded = useSelector(
    (state: RootState) => state.discount.discounts[id]
  );
  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProduct.selected
  );
  const products: any = useSelector((state: RootState) => state.products.all);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productSelection, setProductSelection] = useState<{
    [key: string]: boolean;
  }>({});
  const [variantSelection, setVariantSelection] = useState<{
    [key: string]: boolean;
  }>({});

  const [discounts, setDiscounts] = useState<{
    [key: string]: { amount: number; type: string; visible: boolean };
  }>({});
  const [showVariants, setShowVariants] = useState<{ [key: string]: boolean }>(
    {}
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleAddDiscount = (productId: string) => {
    setDiscounts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], visible: true },
    }));
  };
  const handleDiscountChange = (
    productId: string,
    amount: number,
    type: string
  ) => {
    setDiscounts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], amount, type },
    }));
  };

  const handleProductCheckboxChange = (productId: string) => {
    const isProductSelected = !productSelection[productId];
    setProductSelection((prev) => ({
      ...prev,
      [productId]: isProductSelected,
    }));

    const product = products.data.find((p: any) => p.id === productId);
    if (product) {
      const updatedVariants = product.variants.reduce(
        (acc: any, variant: any) => {
          acc[variant.id] = isProductSelected;
          return acc;
        },
        {}
      );
      setVariantSelection((prev) => ({ ...prev, ...updatedVariants }));
    }
  };

  const handleCheckboxChange = (productId: string, variantId: string) => {
    const updatedVariants = {
      ...variantSelection,
      [variantId]: !variantSelection[variantId],
    };
    setVariantSelection(updatedVariants);

    const productVariants =
      products.data.find((p: any) => p.id === productId)?.variants || [];
    const isAnyVariantSelected = productVariants.some(
      (variant: any) => updatedVariants[variant.id]
    );

    if (isAnyVariantSelected) {
      setProductSelection((prev) => ({ ...prev, [productId]: true }));
    } else {
      setProductSelection((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddSelected = () => {
    const newSelectedProducts = products.data
      .map((product: any) => {
        if (productSelection[product.id]) {
          return {
            ...product,
            variants: product.variants.filter(
              (variant: any) => variantSelection[variant.id]
            ),
          };
        }
        return null;
      })
      .filter((product: any) => product);

    const updatedSelectedProducts = [
      ...selectedProducts,
      ...newSelectedProducts,
    ];
    dispatch(addSelectedProducts(updatedSelectedProducts));
    setProductSelection({});
    setVariantSelection({});
    setSearchTerm(""); // Clear search term
  };

  const handleDeleteVariant = (variantId: string) => {
    dispatch(removeVariant(variantId));
  };

  const filteredProducts = Array.isArray(products.data)
    ? products.data.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleProductDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedProducts = Array.from(selectedProducts);
    const [movedProduct] = reorderedProducts.splice(source.index, 1);
    reorderedProducts.splice(destination.index, 0, movedProduct);

    dispatch(addSelectedProducts(reorderedProducts)); 
  };

  const toggleShowVariants = (productId: string) => {
    setShowVariants((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  return (
    <ProductItem
      handleProductDragEnd={handleProductDragEnd}
      selectedProducts={selectedProducts}
      discounts={discounts}
      isDiscountAdded={isDiscountAdded}
      handleAddDiscount={handleAddDiscount}
      handleDiscountChange={handleDiscountChange}
      toggleShowVariants={toggleShowVariants}
      showVariants={showVariants}
      handleDeleteVariant={handleDeleteVariant}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredProducts={filteredProducts}
      productSelection={productSelection}
      handleProductCheckboxChange={handleProductCheckboxChange}
      variantSelection={variantSelection}
      handleCheckboxChange={handleCheckboxChange}
      handleAddSelected={handleAddSelected}
    />
  );
};

export default ProductRow;
