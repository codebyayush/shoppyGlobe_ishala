import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../store/slices/cartSlice";
import axios from "axios";


const ProductList = ({ clickFunc, loading }) => {
  const filteredArr = useSelector((state) => state.store.filteredArr);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeArr = useSelector((state) => state.store.storeArr);

  //add item to cart if it doesn't exists
  //increases quantity if it does exist
  const addItemHandler = async (item) => {
    try {

      // console.log("item from addItemHandler--", item);
      
      const result = await axios.post(
        "http://localhost:4000/addtocart",
        { product: item },
        { withCredentials: true },
      );

      console.log("result from addItemHandler--", result);

      if (result.status === 200 || result.status === 201) {
        console.log("Item added to cart");
        dispatch(addItemToCart(item));
        clickFunc("Item added to cart");
      } else {
        console.log("failed to add item to the cart");
        alert("Please login first");
        navigate("/login");
      }
    } catch (error) {
      if(error.response.data.msg){
        alert(error.response.data.msg);
        navigate("/authentication");
      }
      else{
        console.error("Error adding item to cart:", error);
      }
      }
    };

  const locateToProduct = (id) => {
    navigate(`/productList/${id}`);
  };

  return (
    <>
      <div className="pt-24 bg-gray-900 screen-max-6:w-fit min-h-screen">
        <div className="flex flex-col p-10 gap-5 items-center screen-max-9:mt-20">
          <div className="flex flex-wrap gap-10 justify-center mb-14">
            {(filteredArr.length > 0 ? filteredArr : storeArr).map((item) => (
              <div
                key={item.id}
                className="bg-[#4f156e] h-fit w-80 cursor-pointer hover:scale-110 transition-transform duration-300 shadow-md"
                onClick={() => locateToProduct(item.id)}
              >
                <div className="h-44 overflow-hidden m-3">
                  <img
                    src={item.images[0]}
                    alt="item-image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="m-3 text-white">{item.title}</p>

                <p className="font-bold text-xl mt-4 m-3 text-[#fff]">
                  $ {item.price}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemHandler(item);
                  }}
                  className="font-bold text-xl mt-4 m-3 p-3 bg-[ #4169e1] border border-white text-white hover:bg-purple-500 transition-colors duration-300 delay-150"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
