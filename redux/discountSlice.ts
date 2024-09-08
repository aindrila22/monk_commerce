import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for Product and Variant
interface Variant {
  id: number;
  title: string;
  price: number;
}

interface Product {
  id: any;
  title: string;
  variants: Variant[];
}

interface Discount {
  amount: number;
  type: "flat" | "percent";
}

interface DiscountState {
  discounts: Record<number, Discount>;
  products: Product[];
}

const initialState: DiscountState = {
  discounts: {},
  products: [
    {
      id: 1,
      title: "Default Product",
      variants: [],
    },
  ],
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    addProduct: (state) => {
      const newProduct: Product = {
        id: Date.now(),
        title: "",
        variants: [],
      };
      state.products.push(newProduct);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },



    removeDiscount: (state, action: PayloadAction<{ id: any }>) => {
      const { id } = action.payload;
      delete state.discounts[id];
    },

    updateProductOrder: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const {
  addProduct,
  updateProduct,
 // addDiscount,
  removeDiscount,
  updateProductOrder,
  removeProduct,
} = discountSlice.actions;

export default discountSlice.reducer;