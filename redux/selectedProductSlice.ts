import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for your product and variant
interface Variant {
  id: string;
  title: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  variants: Variant[];
}

interface SelectedProductState {
  selected: Product[];
}

const initialState: SelectedProductState = {
  selected: [],
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    addSelectedProducts: (state, action: PayloadAction<Product[]>) => {
      state.selected = action.payload;
    },
    removeVariant: (state, action: PayloadAction<string>) => {
      const variantId = action.payload;
      state.selected = state.selected.map(product => ({
        ...product,
        variants: product.variants.filter(variant => variant.id !== variantId),
      }));
    },
  },
});

export const { addSelectedProducts, removeVariant } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;