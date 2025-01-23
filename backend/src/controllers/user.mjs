import bcrypt from "bcrypt";
import { createToken } from "../service/auth.mjs";
import User from "../models/user.js";

//creating a new user
export const handleCreateNewUser = async (req, res) => {
  const { firstName, lastName, address, phone, email, password } = req.body;

  //check if user already exists in db
  const user = await User.findOne({ email });

  if (!user) {
    // used bcrypt to store the hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a new user object
    const newUser = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
    };

    // save the new user to the database
    const result = await User.create(newUser);

    console.log("CREATED USER-", newUser);

    res.status(201).json({ msg: "Success", _id: result._id });
    console.log("Success: new user created", result.id);
    return;
  } else {
    res.status(201).json({ msg: "user already exists" });
    console.log(`user already exists ${user}`);
    return;
  }
};

//login with existing user
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //checking if the user exists in the User collection
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    //this will compare the hashed password with the entered password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    //we'll create a jwt token using the userId if the login is successful
    const token = createToken({ id: user._id });
    console.log("token from login--", token);

    // set jwt cookie for 30 minutes
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({ msg: "Success", _id: user._id });
    return;
  } catch (error) {
    const errorMsg =
      error.message === "User does not exist" ||
      error.message === "Invalid password"
        ? error.message
        : "An error occurred";
    res.status(401).json({ msg: errorMsg });
  }
};

//checking if user is login or not
export const isLoginCheck = async (req, res) => {
  try {
    //getting the userId from req object from the middleware
    const userId = req.userId;

    console.log("userId from isLoginCheck---", userId);

    if(!userId){
        res.status(401).json(false);
        return;
    }
    else{
      res.status(200).json(true);
      return;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ msg: "Internal server error", error: "InternalServerError" });
  }
};

//handling the logout by clearing out the jwt
export const handleLogout = async (req, res) => {
    const token = req.cookies.jwt;

    if(token){
        res.clearCookie("jwt");
        res.status(200).json({msg: "jwt cleared successfully"});
    }else{
        res.status(401).json({ msg: "No token provided", error: "Unauthorized" });
    }
}