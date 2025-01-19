import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Hello from user route");
});

router.route("/login").post((req, res) => {
    
});

export default router;