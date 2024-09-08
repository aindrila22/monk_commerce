"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {
  searchTerm: any;
  setSearchTerm: any;
  filteredProducts: any;
  productSelection: any;
  handleProductCheckboxChange: any;
  variantSelection: any;
  handleCheckboxChange: any;
  handleAddSelected: any;
};

const ProductPicker = ({
  setSearchTerm,
  searchTerm,
  filteredProducts,
  productSelection,
  handleProductCheckboxChange,
  variantSelection,
  handleCheckboxChange,
  handleAddSelected,
}: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="flex justify-start items-center w-full gap-4 mt-4 mx-auto">
      <Image src="/dots.png" alt="" width={10} height={10} className="ml-2" />
      <div className="outline-none flex justify-between items-center border border-gray-200 shadow px-3 py-1 w-2/3">
        <input
          className="outline-none px-2 py-2 w-full "
          placeholder="Select a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Drawer open={isDrawerOpen} onClose={handleCloseDrawer}>
            <DrawerTrigger>
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/edit.png"}
                  alt=""
                  width={18}
                  height={18}
                  onClick={handleOpenDrawer}
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  <div className="flex justify-between items-center px-4">
                    <label className="text-lg">Add Products </label>
                    <label
                      className="text-lg cursor-pointer"
                      onClick={handleCloseDrawer}
                    >
                      ⛌
                    </label>
                  </div>
                </DrawerTitle>
              </DrawerHeader>
              <div className="w-full px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
                <div className="overflow-y-auto max-h-[580px]">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: any) => (
                      <div
                        key={product.id}
                        className="flex flex-col gap-4 my-4 border p-4 rounded-md"
                      >
                        <div className="flex items-center">
                          {product.image.src ? (
                            <Image
                              src={product.image.src}
                              alt={product.title}
                              width={50}
                              height={50}
                            />
                          ) : (
                            <Image
                              src={"/monk.png"}
                              alt={product.title}
                              width={50}
                              height={50}
                            />
                          )}
                          <h2 className="font-bold ml-2">{product.title}</h2>
                          <input
                            type="checkbox"
                            checked={!!productSelection[product.id]}
                            onChange={() =>
                              handleProductCheckboxChange(product.id)
                            }
                            className="ml-2"
                          />
                        </div>
                        {product.variants.map((variant: any) => (
                          <div
                            key={variant.id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={!!variantSelection[variant.id]}
                              onChange={() =>
                                handleCheckboxChange(product.id, variant.id)
                              }
                            />
                            <span>{variant.title}</span>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
                <div className="flex justify-end items-end w-full gap-2 px-4">
                  <button
                    onClick={() => {
                      handleAddSelected();
                      handleCloseDrawer();
                    }}
                    className="mt-4 px-4 py-2 bg-[#008060] text-white rounded-md"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCloseDrawer}
                    className="mt-4 px-4 py-2 border border-gray-200 bg-white text-[#008060] rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <button className="bg-[#008060] text-white w-auto  px-5 py-2">
        Add Discount
      </button>
    </div>
  );
};

export default ProductPicker;
