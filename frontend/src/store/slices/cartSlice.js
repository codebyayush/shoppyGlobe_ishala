import { createSlice } from "@reduxjs/toolkit";

//using amount to store total amount of the cart
const initialState = {
  cartArray: [],
  amount: 0,
  totalItemsInCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {

    //this will add item to the cart
    //if it exists, it will increase the quantity
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

    //this will remove item from the cart
    deleteItemFromCart: (state, action) => {
      const productId = action.payload;

      console.log("productId from cartSlice-", productId);  

      state.cartArray = state.cartArray.filter(
        (product) => {
          console.log("product.cartId from cartSlice-", product.product.id);
          return product.product.id !== productId}
      );

      state.totalItemsInCart = state.cartArray.length;
    },

    //we will run this function whenever we add or remove an item from the cart
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

    //this function will add one to the quantity of the product
    plusOne: (state, action) => {

      const cartId = action.payload;

      state.cartArray.forEach((item) => {
        
        if (item.cartId === cartId) {
          item.quantity += 1;
          }
        });

      state.totalItemsInCart = state.cartArray.length;

    },

    //this function will reduce one from the quantity of the product
    minusOne: (state, action) => {
      const cartId = action.payload;

      state.cartArray = state.cartArray.reduce((acc, curr) => {

        if(curr.product.id == cartId){
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