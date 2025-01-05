import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../store/slices/cartSlice";
import { totalAmount } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";


const ProductDetails = ({clickFunc}) => {
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

  //making sure to run the fetchProductDetails only when url changes
  useEffect(() => {
    fetchProductDetails();
  }, [url]);

  //add item to cart if it doesn't exists
  //increases quantity if it does exist
  const addItemHandler = (item) => {
    dispatch(addItemToCart(item));
    dispatch(totalAmount());
    clickFunc("Item added to cart");
  };

  //destructuring all the details given in product only if product is available
  const {
    title,
    description,
    sku,
    images,
    category,
    brand,
    price,
    stock,
    rating,
    discountPercentage,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    tags,
    reviews,
  } = product || {};

  return (
    <>
      {product ? (
        <>
          <div className="flex justify-center pt-14 screen-max-6:w-fit screen-max-6:h-fit screen-max-12:flex-col screen-max-12:items-center bg-gray-900 min-h-screen p-5">
            {/* Product Image */}
            <div className="pt-10 screen-max-9:pt-20 screen-max-12:w-[500px]">
              <img
                src={images[0]}
                alt="product-image"
                className="w-[500px] h-[500px] p-5 bg-white shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="h-fit w-[500px] text-white mt-10 screen-max-12:mt-5 ml-16 screen-max-12:ml-5 screen-max-12:w-[600px]">
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-lg mt-2">{description}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Category: {category}
                </p>
                <p className="text-sm text-gray-400">Brand: {brand}</p>
                <div className="mt-5">
                  <span className="font-bold text-2xl">$ {price}</span>
                  <span className="ml-2 text-sm line-through text-gray-400">
                    ${((price * 100) / (100 - discountPercentage)).toFixed(2)}
                  </span>
                  <span className="ml-2 text-green-500">
                    ({discountPercentage}% off)
                  </span>
                </div>
                <p className="mt-2 text-sm">Rating: {rating} ⭐</p>
                <p className="mt-2 text-sm">Stock: {stock} units</p>
                <div className="mt-5">
                  <p className="text-sm">
                    Dimensions: {dimensions.width} x {dimensions.height} x{" "}
                    {dimensions.depth} cm
                  </p>
                  <p className="text-sm">Weight: {weight} kg</p>
                  <p className="text-sm mt-2">
                    Warranty: {warrantyInformation}
                  </p>
                  <p className="text-sm">Shipping: {shippingInformation}</p>
                  <p className="text-sm mt-2">
                    Availability: {availabilityStatus}
                  </p>
                  <p className="text-sm mt-2">Return Policy: {returnPolicy}</p>
                  <p className="text-sm mt-2">SKU: {sku}</p>
                  <div className="mt-5">
                    <h2 className="text-xl font-bold">Tags:</h2>
                    <div className="flex flex-wrap mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-800 text-white py-1 px-2 rounded-full text-xs mr-2 mt-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => addItemHandler(product)}
                    className="mt-4 bg-purple-800 w-full text-xl p-5 font-bold hover:bg-purple-500"
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="mt-5">
                  <h2 className="text-xl font-bold">Reviews:</h2>
                  <div className="mt-3 space-y-3">
                    {reviews.map((review, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-400">{review.date}</p>
                        <p className="font-bold">{review.reviewerName}</p>
                        <p className="text-sm">Rating: {review.rating} ⭐</p>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
