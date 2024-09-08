import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProductState {
  all: any[];
}

const initialState: ProductState = {
  all: [], // This should be an empty array
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<[]>) => {
      state.all = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;