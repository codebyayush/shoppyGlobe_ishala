import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetails from "../item-details/ItemDetails";
import Loader from "../loader/Loader";
import useFetch from "../../hooks/useFetch";

const CartItem = () => {

  //getting productId from the parameters of the url
  const { productId } = useParams();
  const url = `https://dummyjson.com/products/${productId}`;

  // using custom hook
  const { data, error } = useFetch(url);

  return (
    <>
    {/* if data is available render ItemDetails */}
       {data ? (
        <ItemDetails
          product={data}
          addItemHandler={() => addItemHandler(data)}
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