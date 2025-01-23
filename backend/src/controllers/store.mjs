import Product from "../models/product.js";

//adding all products to the database
export const addProducts = async (req, res) => {
  const products = req.body;
  console.log("All Products ---", products.products);

  Product.insertMany(products.products)
    .then((result) => {
      console.log("Products added to the database:", result);
      res.status(201).json({ msg: "Success", result });
    })
    .catch((error) => {
      console.error("Error adding products to the database:", error);
      res
        .status(500)
        .json({ msg: "Internal server error", error: "InternalServerError" });
    });
};

//removing duplicates from the product database
export const removeDuplicateProducts = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: { title: "$id" }, // group by unique field
          ids: { $push: "$_id" }, // push all document ids into an array
          count: { $sum: 1 }, // count the number of duplicates
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // filter groups with more than 1 document (duplicates)
        },
      },
    ]);

    for (const productGroup of result) {
      const idsToRemove = productGroup.ids.slice(1); // keep the first document, remove the rest
      console.log("idsToRemove----", idsToRemove);

      await Product.deleteMany({ _id: { $in: idsToRemove } });
    }

    console.log("Duplicates removed successfully");

    res.status(200).json({ msg: "Success", result });
  } catch (error) {
    console.log("Error removing duplicates:", error);

    res
      .status(500)
      .json({ msg: "Internal server error", error: "InternalServerError" });
  }
};

//getting all the products from the product database
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ msg: "successfully fetched", products });
    return;
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: "InternalServerError" });
    return;
  }
};

//getting a product by it's id
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    
    const product = await Product.findById(productId);
    res.status(200).json({ msg: "successfully fetched", product });
    return;
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ msg: "Internal server error", error: "InternalServerError" });
    return;
  }
};
