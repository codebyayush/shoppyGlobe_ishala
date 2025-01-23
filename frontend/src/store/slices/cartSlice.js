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

    //this will add all the items on the initial render of the productList
    addAllItemsToCart: (state, action) => {
      const newProducts = action.payload;
      state.cartArray = newProducts;
      state.totalItemsInCart = state.cartArray.length;
    },

    //this will add item to the cart
    //if it exists, it will increase the quantity
    addItemToCart: (state, action) => {
      const product = action.payload;

      const exists = state.cartArray.some(
        (item) => item._id === product._id
      )

      if(!exists){
        state.cartArray = [...state.cartArray, product];
      }
      else{
        state.cartArray = state.cartArray.map((item) => {
          if(item._id === product._id){
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });
      }

      state.totalItemsInCart = state.cartArray.length;
    },

    //this will remove item from the cart
    deleteItemFromCart: (state, action) => {
      const productId = action.payload;

      console.log("productId from cartSlice-", productId);  

      state.cartArray = state.cartArray.filter(
        (product) => {
          console.log("product.cartId from cartSlice-", product._id);
          return product._id !== productId}
      );

      state.totalItemsInCart = state.cartArray.length;
    },

    //we will run this function whenever we add or remove an item from the cart
    totalAmount: (state) => {
      
      const newAmount = state.cartArray.reduce((acc, curr) => {
          acc += curr.price * curr.quantity;
          return acc;
      }, 0);

      const roundOffAmount = newAmount.toFixed(2);

      //return new state object with new amount
      return {
        ...state,
        amount: roundOffAmount,
      };
    },

    //this function will add one to the quantity of the product
    plusOne: (state, action) => {

      const cartId = action.payload;

      state.cartArray.forEach((item) => {
        
        if (item._id === cartId) {
          item.quantity += 1;
          }
        });

      state.totalItemsInCart = state.cartArray.length;

    },

    //this function will reduce one from the quantity of the product
    minusOne: (state, action) => {
      const cartId = action.payload;

      state.cartArray = state.cartArray.reduce((acc, curr) => {

        if(curr._id == cartId){
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