import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user";


const app = express();
const port = 4000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
    };

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shoppyGlobe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})

app.use(router);

app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});