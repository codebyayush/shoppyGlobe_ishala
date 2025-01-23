import jwt from "jsonwebtoken";
const secret = "chickiwikichicki";

//token will be valid for 1 hr
const maxAge = 60 * 60;

//this will create a jwt token
//using id 
export function createToken(id) {
  return jwt.sign(id, secret, { expiresIn: maxAge });
};