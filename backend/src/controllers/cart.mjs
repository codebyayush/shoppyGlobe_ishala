import Cart from "../models/cart.js";

//fetching cart items
export const fetchCartItems = async (req, res) => {

    try {
        const userId = req.userId;

        console.log("userId from cart--",userId);

        //we'll only fetch the logged in user's cart
        const cartItems = await Cart.find({userId: userId});
        res.status(200).json(cartItems);
        return;
    } catch (error) {
        console.log("Error fetching cart items:", error);
        res.status(500).json({msg: "Error fetching cart items", error: "InternalServerError"});
        return;
    }
}

// adding a new product to the cart
// if the product already exists in the cart, increase the quantity
export const addItemToCart = async (req, res) => {

    try {
        const { product } = req.body;

        console.log("product from cart--",product);
        

        const userId = req.userId;
    
        // checking if the product already exists in the cart with the same userId
        const existingProduct = await Cart.findOne({userId: userId, productId: product._id})
        
        // console.log("existingProduct from cart--",existingProduct);

        // if the product already exists in the cart, increase the quantity
        if(existingProduct){
            await Cart.updateOne({userId: userId, productId: product._id}, {$inc: {quantity: 1}})
        }
        else{
            // else we'll add a new product to the cart & save it
            const newProduct = new Cart({
                userId: userId,
                productId: product._id,
                quantity: 1,
                price: product.price
            });
            await newProduct.save();
        }
        res.status(201).json({msg: "Item added to cart"});
        return;

    } catch (error) {
            console.log("Error adding item to cart:", error);
            res.status(500).json({msg: "Error adding item to cart", error: "InternalServerError"});
    }
}

//this will remove the item from the users cart
export const removeItemFromCart = async (req, res) => {

    try {
        const { productId } = req.params;

        console.log("ProductId from cart--",productId);

        const userId = req.userId;

        await Cart.deleteOne({userId: userId, productId: productId});
        res.status(200).json({msg: "Item removed from cart"});
        return;
    } catch (error) {
        console.log("Error removing item from cart:", error);
        res.status(500).json({msg: "Error removing item from cart", error: "InternalServerError"});
        return;
    }
}

//this will add one item to the existing item
export const plusOneQuantity = async(req, res) => {
    
    try {
        const { productId } = req.params;
        const userId = req.userId;

        await Cart.updateOne({userId: userId, productId: productId}, {$inc: {quantity: 1}})
        res.status(200).json({msg: "Item quantity increased by one"});
        return;

    }catch(error){
        console.log("Error increasing item quantity:", error);
        return;
    }
};

//this will remove one item from the existing item
export const minusOneQuantity = async(req, res) => {
    
    try {
        const { productId } = req.params;
        const userId = req.userId;

        const existingProduct = await Cart.findOne({userId: userId, productId: productId});

        //if the quantity is greater than 1 then we'll decrease it by 1
        //otherwise we'll remove the item from the cart
        if(existingProduct.quantity > 1){
            await Cart.updateOne({userId: userId, productId: productId}, {$inc: {quantity: -1}})
        }
        else{
            await Cart.deleteOne({userId: userId, productId: productId});
        }
        res.status(200).json({msg: "Item quantity decreased by one"});
        return;

    }catch(error){
        console.log("Error decreasing item quantity:", error);
        return;
    }
};
