import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Image from "next/image";
import React from "react";
import ProductPicker from "./ProductPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  handleProductDragEnd: any;
  selectedProducts: any;
  isDiscountAdded: any;
  discounts: any;
  handleAddDiscount: any;
  handleDiscountChange: any;
  toggleShowVariants: any;
  showVariants: any;
  handleDeleteVariant: any;
  searchTerm: any;
  setSearchTerm: any;
  filteredProducts: any;
  productSelection: any;
  handleProductCheckboxChange: any;
  variantSelection: any;
  handleCheckboxChange: any;
  handleAddSelected: any;
};

const ProductItem = ({
  handleProductDragEnd,
  selectedProducts,
  discounts,
  isDiscountAdded,
  handleAddDiscount,
  handleDiscountChange,
  toggleShowVariants,
  showVariants,
  handleDeleteVariant,
  searchTerm,
  setSearchTerm,
  filteredProducts,
  productSelection,
  handleProductCheckboxChange,
  variantSelection,
  handleCheckboxChange,
  handleAddSelected,
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-4xl gap-2 mx-auto mt-4">
      <div className="w-full mx-auto flex justify-between border-none">
        <DragDropContext onDragEnd={handleProductDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <div
                className="w-full"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedProducts.length > 0 && (
                  <>
                    {selectedProducts.map((product: any, index: number) => (
                      <Draggable
                        key={product.id}
                        draggableId={`product-${product.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col justify-start items-center w-full gap-2 py-2 px-3"
                          >
                            <div className="flex justify-start items-center w-full gap-4">
                              <Image
                                src="/dots.png"
                                alt=""
                                width={10}
                                height={10}
                              />
                              <input
                                className="outline-none w-2/3 shadow px-4 py-3 border border-gray-300"
                                value={product.title}
                                readOnly
                              />
                              <div>
                                {!isDiscountAdded &&
                                  !discounts[product.id]?.visible && (
                                    <button
                                      className="bg-[#008060] text-white w-auto px-5 py-2"
                                      onClick={() =>
                                        handleAddDiscount(product.id)
                                      }
                                    >
                                      Add Discount
                                    </button>
                                  )}
                                <div>
                                  {discounts[product.id]?.visible && (
                                    <div className="w-full flex justify-center items-center gap-4">
                                      <input
                                        className="border w-16 px-2 py-2 rounded-md border-gray-300 flex-shrink-0" // Prevents shrinking
                                        type="number"
                                        value={
                                          discounts[product.id]?.amount || 0
                                        }
                                        onChange={(e) =>
                                          handleDiscountChange(
                                            product.id,
                                            Number(e.target.value),
                                            discounts[product.id]?.type ||
                                              "flat"
                                          )
                                        }
                                      />

                                      <Select
                                        value={
                                          discounts[product.id]?.type || "flat"
                                        }
                                        onValueChange={(value) =>
                                          handleDiscountChange(
                                            product.id,
                                            discounts[product.id]?.amount || 0,
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-[100px]">
                                          <SelectValue placeholder="Discount" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="flat">
                                            Flat Off
                                          </SelectItem>
                                          <SelectItem value="percent">
                                            % Off
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="w-full">
                              <div className="justify-end flex items-end w-10/12">
                                <button
                                  onClick={() => toggleShowVariants(product.id)}
                                  className="my-2 text-blue-500 underline underline-offset-4"
                                >
                                  {showVariants[product.id]
                                    ? "Hide Variants"
                                    : "Show Variants"}
                                </button>
                              </div>
                              {product.variants &&
                                product.variants.length > 0 &&
                                showVariants[product.id] && (
                                  <div>
                                    {product.variants.map(
                                      (variant: any, index: number) => (
                                        <div key={index} className="flex justify-end w-10/12 items-center my-5 gap-3">
                                          <Image
                                            src="/dots.png"
                                            alt=""
                                            width={10}
                                            height={10}
                                          />
                                          <input
                                            className="outline-none w-9/12 rounded-3xl  px-4 py-2 border border-gray-300"
                                            value={`${variant.title} - ${variant.price} USD`}
                                            readOnly
                                          />
                                          <button
                                            onClick={() =>
                                              handleDeleteVariant(variant.id)
                                            }
                                            className="ml-3"
                                          >
                                            ⛌
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <ProductPicker
                      setSearchTerm={setSearchTerm}
                      searchTerm={searchTerm}
                      filteredProducts={filteredProducts}
                      productSelection={productSelection}
                      handleProductCheckboxChange={handleProductCheckboxChange}
                      variantSelection={variantSelection}
                      handleCheckboxChange={handleCheckboxChange}
                      handleAddSelected={handleAddSelected}
                    />
                    <div className="justify-end w-10/12 mt-5 mb-5 flex items-end">
                      <button className="mt-4 px-4 py-2 border-[#008060] border-2 w-56 text-[#008060] rounded-md">
                        Add Product
                      </button>
                    </div>
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {selectedProducts.length <= 0 && (
        <ProductPicker
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          filteredProducts={filteredProducts}
          productSelection={productSelection}
          handleProductCheckboxChange={handleProductCheckboxChange}
          variantSelection={variantSelection}
          handleCheckboxChange={handleCheckboxChange}
          handleAddSelected={handleAddSelected}
        />
      )}
    </div>
  );
};

export default ProductItem;
