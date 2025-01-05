import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import { addItemToCart, totalAmount } from "../../store/slices/cartSlice";


const ProductList = ({ clickFunc, loading }) => {
  const filteredArr = useSelector((state) => state.store.filteredArr);

  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeArr = useSelector((state) => state.store.storeArr);

  console.log(storeArr);

  //add item to cart if it doesn't exists
  //increases quantity if it does exist
  const addItemHandler = (item) => {
    dispatch(addItemToCart(item));
    dispatch(totalAmount());
    clickFunc("Item added to cart");
  };

  console.log("loading from product--", loading);

  return (
    <>
      <div className=" pt-24 bg-gray-900 screen-max-6:w-fit min-h-screen">
        <div className="flex flex-col p-10 gap-5 items-center screen-max-9:mt-20">
          <div className="flex flex-wrap gap-10 justify-center mb-14">
            {(filteredArr.length > 0 ? filteredArr : storeArr).map(
              (item, ind) => (
                <div
                  key={ind}
                  className="border bg-[#4f156e] h-fit w-80 cursor-pointer border-[#D1D5DB] hover:scale-110 transition-transform duration-300 shadow-md"
                >
                  <div className="h-44 overflow-hidden m-3">
                    <Link to={`/productList/${item.id}`}>
                      <img
                        src={item.images[0]}
                        alt="item-image"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  <Link to={`/productList/${item.id}`}>
                    <p className="m-3 text-white">{item.title}</p>
                  </Link>
                  <Link to={`/productList/${item.id}`}>
                    <p className="font-bold text-xl mt-4 m-3 text-[#fff]">
                      $ {item.price}
                    </p>
                  </Link>
                  <button
                    onClick={() => addItemHandler(item)}
                    className="font-bold text-xl mt-4 m-3 p-3 bg-[ #4169e1] border border-white text-white hover:bg-purple-500 transition-colors duration-300 delay-150"
                  >
                    Add to Cart
                  </button>
                </div>
              )
            )}
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
