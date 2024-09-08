
import { configureStore } from '@reduxjs/toolkit';

import discountReducer from "./discountSlice"
import productReducer from "./productSlice"
import selectedProductReducer from "./selectedProductSlice"
const store = configureStore({
  reducer: {
    discount: discountReducer,
    products: productReducer,
    selectedProduct: selectedProductReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;