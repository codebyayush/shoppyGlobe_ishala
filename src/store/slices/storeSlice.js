import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeArr: [],
  filteredArr: [], 
  totalItem: 0,
};

const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    //this will add all the items on the initial render of the productList
    addAllItems: (state, action) => {
      const newProducts = action.payload;

      newProducts.forEach((newProduct) => {
        const exists = state.storeArr.some(
          (product) => product.id === newProduct.id
        );

        if (!exists) {
          state.storeArr = [...state.storeArr, newProduct];
        }
      });
    },
    //total items of the store
    totalCount: (state) => {
      state.totalItem = state.storeArr.length;
    },

    //this removes all items at once
    removeAllItems: (state) => {
      return {
        ...state,
        storeArr: [],
      };
    },

    filterItemSearch: (state, action) => {
      const filteredItems = action.payload;

      //this will directly update the filteredArr to show in the productList
      console.log("filteredItems from searchBar--",filteredItems);
      state.filteredArr = filteredItems;
    },
  },
});

export const { addAllItems, filterItemSearch, removeAllItems } =
  storeSlice.actions;

export default storeSlice.reducer;
