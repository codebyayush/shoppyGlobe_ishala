import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetails from "../item-details/ItemDetails";
import Loader from "../loader/Loader";
import useFetch from "../../hooks/useFetch";
import { deleteItemFromCart, totalAmount } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";


const CartItem = () => {

  //getting productId from the parameters of the url
  const { productId } = useParams();
  const url = `https://dummyjson.com/products/${productId}`;

  // using custom hook
  const { data, error } = useFetch(url);
  const dispatch = useDispatch();

  const removeItemHandler = (item) => {
    dispatch(deleteItemFromCart(item.id));
    dispatch(totalAmount());
  }

  return (
    <>
    {/* if data is available render ItemDetails */}
       {data ? (
        <ItemDetails
          product={data}
          removeItemHandler={() => removeItemHandler(data)}
        />
      ) : error ? (
        // if error is available render error message
        <div className="text-center pt-72 bg-gray-900 h-screen text-white">
          <h2 className="font-bold text-xl">
            Error fetching product details: {error.message}
          </h2>
        </div>
      ) : (
        // if data & error is not available then we'll render loader
        <div className="text-center h-screen pt-72 bg-gray-900 border border-white">
          <Loader />
        </div>
      )}
    </>
  );
};

export default CartItem;