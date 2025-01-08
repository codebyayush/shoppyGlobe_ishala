import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../store/slices/cartSlice";
import { totalAmount } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import ItemDetails from "../item-details/ItemDetails";

const ProductDetails = ({ clickFunc }) => {
  // getting productId from the parameters of the url
  const { productId } = useParams();

  const url = `https://dummyjson.com/products/${productId}`;
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

  //fetching data for the given url
  const fetchProductDetails = async () => {
    try {
      const result = await axios.get(url);

      if (result.status === 200) {
        setProduct(result.data);
      } else {
        console.error("Error fetching product details:", result.statusText);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  //making sure to run the fetchProductDetails only when the url changes
  useEffect(() => {
    fetchProductDetails();
  }, [url]);

  //add item to cart if it doesn't exists
  //increases quantity if it exists
  const addItemHandler = (item) => {
    //after updating the cart, we will update the total amount 
    //and with clickFunc we will show a toast notification
    dispatch(addItemToCart(item));
    dispatch(totalAmount());
    clickFunc("Item added to cart");
  };

  
  return (
    <>
      {product ? (
        <>
          <ItemDetails
            product={product}
            addItemHandler={() => addItemHandler(product)}
          />
        </>
      ) : (
        <div className=" text-center pt-72 bg-gray-900 h-screen">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
