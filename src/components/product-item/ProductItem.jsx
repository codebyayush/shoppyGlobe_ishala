import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart, totalAmount } from "../../store/slices/cartSlice";

const ProductItem = ({ clickFunc }) => {
  const dispatch = useDispatch();
  const storeArr = useSelector((state) => state.store.storeArr);
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = storeArr.find((item) => item.id == productId);

  console.log(product);

  const { title, images, description, price, stock, category, rating } =
    product;

  //add item to cart if it doesn't exists
  //increases quantity if it does exist
  const addItemHandler = (item) => {
      dispatch(addItemToCart(item))
      dispatch(totalAmount());
      clickFunc("Item added to cart")
  };

  return (
    <>
      <div className="flex justify-center screen-max-6:w-fit screen-max-6:h-fit screen-max-12:flex-col screen-max-12:items-center bg-gray-900 min-h-screen">
        {/* product image */}
        <div className="pt-40 screen-max-9:pt-52 screen-max-12:w-[500px]">
          <img
            src={images[0]}
            alt="product-image"
            className="w-[500px] h-[500px] p-5 bg-white"
          />
        </div>

        {/* product details */}
        <div className=" h-fit w-[500px] text-white mt-40 screen-max-12:mt-20 ml-16 screen-max-12:ml-5 screen-max-12:w-[600px]">
          <div>
            <h1 className="text-3xl ">{title}</h1>

            <h1 className="mt-10 font-bold text-3xl">$ {price}</h1>

            <div className=" mt-12 p-5 ">
              

              <button
                onClick={() => addItemHandler(product)}
                className="mt-4 bg-purple-800 w-full text-xl p-5 font-bold hover:bg-purple-500"
              >
                Add To Cart
              </button>
              <button
                onClick={() => navigate(`/productDetails/${product.id}`, { state: { refresh: true } })}
                className="mt-4 bg-purple-800 w-full text-xl p-5 font-bold hover:bg-purple-500"
              >
                Goto Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;