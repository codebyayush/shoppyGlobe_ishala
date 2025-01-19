import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
  reducer: {
    store: storeReducer, cart: cartReducer, auth: authReducer
  },
});

export default store;