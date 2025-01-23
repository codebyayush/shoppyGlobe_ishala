import axios from "axios";

export const fetchCart = async () => {

  try {
    const result = await axios.get("http://localhost:4000/cart", {
      withCredentials: true,
    });

    console.log("result from fetchCart--", result);
    

    return result;
  } catch (error) {
    console.error("Error fetching cart products: ", error.message);
  }
};


export const plusOneQuantity = async (cartId) => {
  try {
    const result = await axios.put(
      `http://localhost:4000/plusOne/${cartId}`,
      { withCredentials: true }
    );
    console.log("result from plusOne--", result);
    return result;
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
  }
};

export const minusOneQuantity = async (cartId) => {
  try {
    const result = await axios.put(
      `http://localhost:4000/minusOne/${cartId}`,
      { withCredentials: true }
    );
    console.log("result from minusOne--", result);
    return result;
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
  }
};