import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArray: [],
  amount: 0,
  totalItemsInCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {

    addItemToCart: (state, action) => {
      const product = action.payload;

      const exists = state.cartArray.some(
        (item) => item.product.id === product.id
      );

      if (!exists) {
        state.cartArray = [
          ...state.cartArray,
          { product: product, quantity: 1, cartId: Date.now() },
        ];
      } else {
        state.cartArray = state.cartArray.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      state.totalItemsInCart = state.cartArray.length;
    },

    deleteItemFromCart: (state, action) => {
      const productId = action.payload;

      state.cartArray = state.cartArray.filter(
        (product) => product.cartId !== productId
      );

      state.totalItemsInCart = state.cartArray.length;
    },

    totalAmount: (state) => {
      const newAmount = state.cartArray.reduce((acc, curr) => {
        const quantity = Number(curr.quantity) || 0;
        const price = Number(curr.product.price) || 0;
        return acc + quantity * price;
      }, 0);

      const roundOff = newAmount.toFixed(2);

      //return new state object with new amount
      return {
        ...state,
        amount: roundOff,
      };
    },

    plusOne: (state, action) => {

      const cartId = action.payload;

       state.cartArray.forEach((item) => {
        
        if (item.cartId === cartId) {
          item.quantity += 1;
          }
        });

      state.totalItemsInCart = state.cartArray.length;

    },

    minusOne: (state, action) => {
      const cartId = action.payload;

      state.cartArray = state.cartArray.reduce((acc, curr) => {

        if(curr.cartId == cartId){
            if(curr.quantity > 1){

              acc.push({...curr, quantity: curr.quantity - 1})
            }
          }
        
        else{
            acc.push(curr);
          }

        return acc;

      }, [])

      state.totalItemsInCart = state.cartArray.length;
    },
  },
});

export const {
  addItemToCart,
  addAllItemsToCart,
  deleteItemFromCart,
  totalAmount,
  minusOne,
  plusOne
} = cartSlice.actions;

export default cartSlice.reducer;