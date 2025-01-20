import express from "express";
import { handleCreateNewUser, handleLogin, isLoginCheck, handleLogout } from "../controllers/user.mjs";
import requireAuth from "../middlewares/user.js";

const routes = express.Router();

routes.route("/").get((req, res) => {
  res.send("Hello from user route");
});

// creating a new user
routes.route("/signup").post(handleCreateNewUser);

// logging in to existing user
routes.route("/login").post(handleLogin);

//logout and clear jwt
routes.route("/logout").get(handleLogout);

// checking if user is logged in or not using middleware
routes.route("/islogin").get(requireAuth, isLoginCheck);

export default routes;
