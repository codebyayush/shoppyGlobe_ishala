import express from "express";
import { handleCreateNewUser, handleLogin, isLoginCheck, handleLogout } from "../controllers/user.mjs";
import requireAuth from "../middlewares/user.js";
import { addProducts, getAllProducts, getProductById, removeDuplicateProducts } from "../controllers/store.mjs";
import { addItemToCart , minusOneQuantity, plusOneQuantity, removeItemFromCart, fetchCartItems} from "../controllers/cart.mjs";

const routes = express.Router();

routes.route("/").get((req, res) => {
  res.send("Welcome to ShoppyGlobe");
})

//Authentication ROUTES
// creating a new user
routes.route("/signup").post(handleCreateNewUser);
// logging in to existing user
routes.route("/login").post(handleLogin);
//logout and clear jwt
routes.route("/logout").get(handleLogout);
// checking if user is logged in or not using middleware
routes.route("/islogin").get(requireAuth, isLoginCheck);


// Product ROUTES
//add products
routes.route("/addproducts").post(addProducts)
//remove duplicate products
routes.route("/removeDuplicates").get(removeDuplicateProducts);
//get all products
routes.route("/getProducts").get(getAllProducts);
//get product by id
routes.route("/getProduct/:productId").get(getProductById)



// Cart ROUTES
//cart routes
//fetch cart items (using middleware to get the current userId)
routes.route("/cart").get(requireAuth, fetchCartItems);
//adding item to cart
routes.route("/addtocart").post(requireAuth, addItemToCart)
//increase quantity by 1 using parameters to get the productId
routes.route("/plusOne/:productId").put(requireAuth, plusOneQuantity)
//decrease quantity by 1
routes.route("/minusOne/:productId").put(requireAuth, minusOneQuantity)
//remove item from cart
routes.route("/removeItem/:productId").delete(requireAuth, removeItemFromCart)



export default routes;
