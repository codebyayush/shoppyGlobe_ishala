import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ItemDetails from "../item-details/ItemDetails";
import Loader from "../loader/Loader";

const CartItem = () => {
  const { productId } = useParams();

  const url = `https://dummyjson.com/products/${productId}`;

  const [product, setProduct] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const result = await axios.get(url);

      if (result.status === 200) {
        setProduct(result.data);
      } else {
        console.error("Error fetching product details:", result.statusText);
      }
    } catch (error) {
      console.error("Error fetching product details:", result.statusText);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return <>{product ? <ItemDetails product={product} /> : <div className="flex justify-center items-center h-screen bg-gray-900"><Loader /></div>}</>;
};

export default CartItem;
