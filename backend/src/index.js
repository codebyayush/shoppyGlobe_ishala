import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;


//only accepting requests from localhost:5173
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
    };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//connecting to mongodb shoppyGlobe database
mongoose.connect("mongodb://localhost:27017/shoppyGlobe").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})

//using routes defined in routes/user.js
app.use(routes);

//starting the server
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});