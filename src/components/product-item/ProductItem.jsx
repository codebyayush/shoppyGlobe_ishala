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

  const { title, images, price } = product;

  //add item to cart if it doesn't exists
  //increases quantity if it does exist
  const addItemHandler = (item) => {
    dispatch(addItemToCart(item));
    dispatch(totalAmount());
    clickFunc("Item added to cart");
  };

  return (
    <>
      <div className="flex justify-center border border-white screen-max-7:w-fit screen-max-7:h-fit screen-max-12:flex-col screen-max-12:items-center bg-gray-900 min-h-screen">
        {/* product image */}
        <div className="pt-40 screen-max-9:pt-52 screen-max-12:w-[500px] p-4 screen-max-7:w-[300px] screen-max-6:pl-24">
          <img
            src={images[0]}
            alt="product-image"
            className="w-[500px] h-[500px] p-5 bg-white screen-max-7:h-[300px] screen-max-7:w-[300px] "
          />
        </div>

        {/* product details */}
        <div className=" h-fit w-[500px] border border-white text-white mt-40 screen-max-12:mt-20 ml-16 screen-max-12:ml-5 screen-max-6:w-[200px] screen-max-12:w-[600px]">
          <div className="w-auto">
            <div className=" screen-max-6:pl-12 screen-max-6:w-auto">
              <h1 className="text-3xl screen-max-6:w-auto">{title}</h1>

              <h1 className="mt-10 font-bold text-3xl">$ {price}</h1>
            </div>

            <div className=" mt-12 p-5 screen-max-6:flex screen-max-6:flex-col screen-max-6:w-auto screen-max-6:items-center">
              <button
                onClick={() => addItemHandler(product)}
                className="mt-4 bg-purple-800 w-full screen-max-6:w-72 text-xl p-5 font-bold hover:bg-purple-500"
              >
                Add To Cart
              </button>
              <button
                onClick={() =>
                  navigate(`/productDetails/${product.id}`, {
                    state: { refresh: true },
                  })
                }
                className="mt-4 bg-purple-800 w-full screen-max-6:w-72 text-xl p-5 font-bold hover:bg-purple-500"
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
