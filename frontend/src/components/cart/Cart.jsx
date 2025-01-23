import { useDispatch, useSelector } from "react-redux";
import { addAllItemsToCart, deleteItemFromCart } from "../../store/slices/cartSlice";
import { totalAmount } from "../../store/slices/cartSlice";
import { plusOne, minusOne } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { fetchCart } from "../../utils/cartUtils";


const Cart = () => {
  const cartArray = useSelector((state) => state.cart.cartArray);
  const storeArr = useSelector((state) => state.store.storeArr);
  const amount = useSelector((state) => state.cart.amount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCart();
        console.log("result from fetchCart--", result);

        if(result.status === 200 || result.status === 201){

          // we'll get the data from 'carts' collection in this form
          // so we have to take the productId and get the product first 
          // then we'll attach the quantity of the product to the cart
          // {
          //   "_id": {
          //     "$oid": "678f957073d83a155d64ca07"
          //   },
          //   "userId": {
          //     "$oid": "678e0878dfb948fc784387a2"
          //   },
          //   "productId": {
          //     "$oid": "678e4bcbaaea70c65e44144c"
          //   },
          //   "quantity": 1,
          //   "price": 14.99,
          //   "__v": 0
          // }
            
            // this will filter out the products from the store with 
            // the given ids from the database cart array
            const newCartArr = storeArr.filter((item) => {
              return result.data.some((cartItem) => {
                return cartItem.productId === item._id;
              });
            });

            console.log("cart array--", newCartArr);

            // this will add the quantity of the product from 
            // the database cart to the cartArray
            const newArr = newCartArr.map((item) => {
                return {
                  ...item, 
                  quantity: result.data.reduce((acc, curr) => {
                        if(curr.productId === item._id){
                          acc = curr.quantity;
                        }
                        return acc;
                  }, 0)
                }
            })

            console.log("new array--", newArr);

            dispatch(addAllItemsToCart(newArr));
            dispatch(totalAmount());
            return;
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchData();
  }, []);

  //deleting item from cart
  const deleteItemHandler = async (cartId) => {
    console.log("cartId from cartJSX-", cartId);

    try {

      const result = await axios.delete(`http://localhost:4000/removeItem/${cartId}`, {
        withCredentials: true
      });

      console.log("result from deleteItemHandler--", result);

      if(result.status === 200 || result.status === 201){
        console.log("Item deleted from cart", result);
        dispatch(deleteItemFromCart(cartId));
        dispatch(totalAmount());
      }
      else{
        console.log("failed to delete item from the cart");
      }

    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //increases quantity by one
  const plusOneClick = async (cartId) => {
    
    console.log("cartId from cartJSX PLUSCLICK-", cartId);

    try {
      //empty object for the request body it is not needed
      //must pass empty object as a second argument because it is a put request
      const result = await axios.put(`http://localhost:4000/plusOne/${cartId}`,{}, {
        withCredentials: true
      })

      if(result.status === 200 || result.status === 201){ 
        console.log("Item deleted from cart", result);
        dispatch(plusOne(cartId));
        dispatch(totalAmount());
      }
      else{
        console.log("failed to delete item from the cart");
      }

    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  // console.log("Cart.jsx RENDERED", cartArray);

  //reduces quantity by one
  const minusOneClick = async (cartId) => {
    
    console.log("cartId from cartJSX MINUSCLICK-", cartId);

    try {
      //empty object for the request body it is not needed
      //must pass empty object as a second argument because it is a put request
      const result = await axios.put(`http://localhost:4000/minusOne/${cartId}`,{}, {
        withCredentials: true
      })

      if(result.status === 200 || result.status === 201){ 
        console.log("Item deleted from cart");
        dispatch(minusOne(cartId));
        dispatch(totalAmount());
      }
      else{
        console.log("failed to delete item from the cart");
      }

    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  console.log("cartArray from cart.jsx--", cartArray);

  // using navigate to locate to the product
  // without reloading the cart page
  const locateToProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  return (
    <>
      <div className="pt-28 screen-max-9:pt-60 min-h-screen w-screen bg-gray-900 screen-max-4:w-fit">
        <h1 className="text-center font-bold text-5xl screen-max-9:text-3xl text-yellow-400">
          Your Cart
        </h1>

        {/* if cartarray is empty we'll simply show cart is empty otherwise we'll render the cart items */}
        {cartArray.length !== 0 ? (
          cartArray.map((item) => (
            <div
              key={item._id}
              className="p-10 text-white mt-3 w-1/2 m-auto screen-max-12:w-auto min-w-96 screen-max-7:p-2 border border-yellow-200"
              onClick={() => locateToProduct(item.id)}
            >
              <div className="flex">
                <div className="flex w-full">
                  <img
                    className="w-40 h-40 shadow-lg screen-max-4:w-24 screen-max-4:h-24"
                    src={item.images[0]}
                    alt={item.title}
                  />
                  <div className="mt-3 ml-10 flex justify-between w-full screen-max-7:flex-col screen-max-7:gap-3 font-medium text-lg">
                    <div>
                      <div>
                        <p>{item.title}</p>
                        <p className="mt-3 font-bold">
                          $ {item.price} × {item.quantity} = ${" "}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <p className="mt-3 font-bold w-24">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            plusOneClick(item._id);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-l hover:scale-110 transition-transform duration-300"
                        >
                          +
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            minusOneClick(item._id);
                          }}
                          className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-r hover:scale-105 transition-transform duration-300"
                        >
                          -
                        </button>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItemHandler(item._id);
                      }}
                      className="pr-4 pl-4 h-1/3 bg-white text-black screen-max-6:p-2 screen-max-7:w-32 screen-max-7:p-2  hover:bg-red-700 hover:text-white hover:scale-110 transition-transform duration-300"
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="font-bold w-screen text-4xl screen-max-9:text-2xl text-center mt-5 text-yellow-400">
            is empty
          </h1>
        )}

        {!cartArray.length == 0 && (
          <>
            <div className="flex flex-col pb-20 m-auto w-1/2 items-end screen-max-12:w-auto screen-max-12:pr-8">
              {/* this button doesn't work it's dummy */}
              <button
                type="button"
                className="p-3 w-52 mt-4 bg-green-300 font-medium hover:bg-green-600 hover:text-white text-black hover:scale-105 transition-transform duration-300"
              >
                Buy Now
              </button>
              <h1 className=" text-xl mt-5 screen-max-7:w-44 font-bold text-yellow-400">
                Total amount: $ {amount}
              </h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
