import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Header from "./components/header/Header";
import ProductList from "./components/product-list/ProductList";
import useFetch from "./hooks/useFetch";
import { addAllItems } from "./store/slices/storeSlice";
import ProductDetails from "./components/product-details/ProductDetails";
import Loader from "./components/loader/Loader";
import { setIsLoginUsingToken } from "./store/slices/authSlice";

//used of lazy loading to load the components only when needed
const Cart = lazy(() => import("./components/cart/Cart"));
const ProductItem = lazy(() => import("./components/product-item/ProductItem"));
const CartItem = lazy(() => import("./components/cart-item/CartItem"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));
const Authentication = lazy(() =>
  import("./components/authentication/Authentication")
);

function App() {
  const dispatch = useDispatch();

  //fetching data on initial render
  //using useFetch custom hook to fetch products
  const { data, loading, error } = useFetch(
    "http://localhost:4000/getProducts"
  );

  // to handle error and data from useFetch we'll make use of useEffect
  useEffect(() => {

    // console.log("products---",data);
    
    try {
      if (data) {
        const products = data.products;
        dispatch(addAllItems(products));
        // dispatch(totalAmount());
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, [data, error, dispatch]);

  // useEffect to check if the user is login or not
  useEffect(() => {
    const isLoginCheck = async () => {
      const waitForMe = await axios.get("http://localhost:4000/islogin", {
        withCredentials: true,
      });

      if (waitForMe.status === 200) {
        console.log("user is logged in--", waitForMe);
        dispatch(setIsLoginUsingToken(waitForMe.data));

        // const result = await fetchCart();

        // if(result.status === 200 || result.status === 201){
        //   dispatch(addAllItemsToCart(result.data));
        //   dispatch(totalAmount());
        // }
      }

      console.log("current login status-- ", waitForMe);
      return;
    };

    isLoginCheck();
  }, []);

  //to show toast notification I have installed react-toastify
  //we'll pass this function as a prop to the components
  const notify = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });
  };

  return (
    <>
      {/* made use of react router to navigate different pages */}
      <BrowserRouter>
        <Header />
        <Suspense
          fallback={<Loader className={"flex justify-center items-center"} />}
        >
          <Routes>
            {/* for unknown routes we'll redirect to NotFound component*/}
            <Route path="*" element={<NotFound />} />

            {/* for normal page & /productList we'll render ProductList component*/}
            <Route
              path="/"
              element={
                <ProductList
                  clickFunc={(msg) => notify(msg)}
                  loading={loading}
                />
              }
            />
            <Route
              path="/productList"
              element={
                <ProductList
                  clickFunc={(msg) => notify(msg)}
                  loading={loading}
                />
              }
            />
            <Route
              path="/productList/:productId"
              element={<ProductItem clickFunc={(msg) => notify(msg)} />}
            />
            {/* we'll fetch product in the ProductDetails component */}
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails clickFunc={(msg) => notify(msg)} />}
            />
            <Route path="/cart" element={<Cart />} />
            {/* similarly like ProductDetails we'll fetch the product details on CartItem 
            but without Add to cart button*/}
            <Route path="/cart/:productId" element={<CartItem />} />

            {/* for authentication we'll render Authentication component */}
            <Route path="/authentication" element={<Authentication />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      {/* to show toast notification using ToastContainer */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        toastStyle={{}}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </>
  );
}

export default App;
