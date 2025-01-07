import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Header from "./components/header/Header";
import ProductList from "./components/product-list/ProductList";
import useFetch from "./hooks/useFetch";
import { addAllItems } from "./store/slices/storeSlice";
import ProductDetails from "./components/product-details/ProductDetails";

const Cart = lazy(() => import("./components/cart/Cart"));
const ProductItem = lazy(() => import("./components/product-item/ProductItem"));
const CartItem = lazy(() => import("./components/cart-item/CartItem"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));

function App() {
  const dispatch = useDispatch();

  //fetching data on initial render
  //using useFetch custom hook to fetch products
  const { data, loading, error } = useFetch("https://dummyjson.com/products");

  if (data) {
    dispatch(addAllItems(data.products));
  }

  //toast notification
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
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* for unknown routes */}
            <Route path="*" element={<NotFound />} />

            {/* for normal page we'll render ProductList */}
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
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails clickFunc={(msg) => notify(msg)} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/:productId" element={<CartItem />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

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
