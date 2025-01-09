import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../store/slices/cartSlice";
import { totalAmount } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import ItemDetails from "../item-details/ItemDetails";
import useFetch from "../../hooks/useFetch";

const ProductDetails = ({ clickFunc }) => {
  //getting productId from the parameters of the url
  const { productId } = useParams();

  const url = `https://dummyjson.com/products/${productId}`;
  const dispatch = useDispatch();

  //fetching data for the given URL
  const { data, loading, error } = useFetch(url);

  //add item to cart if it doesn't exist,
  //increases quantity if it exists
  const addItemHandler = (item) => {
    dispatch(addItemToCart(item));
    dispatch(totalAmount());
    clickFunc("Item added to cart");
  };

  return (
    <>
      {/* conditionally rendering in loading, error and product */}
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
      {data && (
        <ItemDetails
          product={data}
          addItemHandler={() => addItemHandler(data)}
        />
      )}
    </>
  );
};

export default ProductDetails;
