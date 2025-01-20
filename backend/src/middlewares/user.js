import jwtoken from "jsonwebtoken";


const requireAuth = (req, res, next) => {
    
    const token = req.cookies.jwt;

    console.log("token from requireAuth--", token);
    
    // checking if the token exists or not
    if (!token) {
      res.status(401).json({ msg: "No token provided", error: "Unauthorized" });
    }

    try {
      // verifying the token using the secret to decode its payload
      const data = jwtoken.verify(token, "chickiwikichicki");
      
      // if the token is valid attach the userId to the request object
      req.userId = data.id;
      console.log("req.userId from requireAuth--", req.userId);

      // calling the next middleware function
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ msg: "Token has expired", error: "TokenExpiredError" });
      } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({ msg: "Invalid token", error: "JsonWebTokenError" });
      } else {
        console.error("Error verifying token:", error);
        res.status(500).json({ msg: "Internal server error", error: "InternalServerError" });
      }
    }
  };

export default requireAuth;
