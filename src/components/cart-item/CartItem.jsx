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
  const { data, loading, error } = useFetch(url);

  return (
    <>
      {loading && (
        <div className="text-center pt-72 bg-gray-900 h-screen">
          <Loader />
        </div>
      )}
      {error && (
        <div className="text-center pt-72 bg-gray-900 h-screen text-white">
          <h2 className="font-bold text-xl">
            Error fetching product details: {error.message}
          </h2>
        </div>
      )}
      {data && <ItemDetails product={data} />}
    </>
  );
};

export default CartItem;