import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import cartReducer from "./slices/cartSlice";


const store = configureStore({
  reducer: {
    store: storeReducer, cart: cartReducer
  },
});

export default store;