import React from "react";

const ItemDetails = ({ product, addItemHandler }) => {
  const {
    title,
    description,
    sku,
    images,
    category,
    brand,
    price,
    stock,
    rating,
    discountPercentage,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    tags,
    reviews,
  } = product || {};

  return (
    <>
      <div className="flex justify-center screen-max-9:pt-16 pt-32 screen-max-6:w-fit screen-max-6:h-fit screen-max-12:flex-col screen-max-12:items-center bg-gray-900 min-h-screen p-5">
        {/* Product Image */}
        <div className="screen-max-6:pt-40 screen-max-9:pt-52 screen-max-12:w-[500px] p-4 screen-max-7:w-auto">
          <img
            src={images[0]}
            alt="product-image"
            className="max-w-[500px] max-h-[500px] screen-max-6:w-auto screen-max-6:h-auto p-5 bg-white shadow-lg"
          />
        </div>

        {/* Product Details */}
        {product && <div className="h-fit w-[500px] screen-max-6:w-auto text-white screen-max-12:mt-20 ml-16 screen-max-12:ml-5 screen-max-12:w-[600px]">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg mt-2">{description}</p>
            <p className="text-sm text-gray-400 mt-1">Category: {category}</p>
            <p className="text-sm text-gray-400">Brand: {brand}</p>
            <div className="mt-5">
              <span className="font-bold text-2xl">$ {price}</span>
              <span className="ml-2 text-sm line-through text-gray-400">
                ${((price * 100) / (100 - discountPercentage)).toFixed(2)}
              </span>
              <span className="ml-2 text-green-500">
                ({discountPercentage}% off)
              </span>
            </div>
            <p className="mt-2 text-sm">Rating: {rating} ⭐</p>
            <p className="mt-2 text-sm">Stock: {stock} units</p>
            <div className="mt-5">
              <p className="text-sm">
                Dimensions: {dimensions.width} x {dimensions.height} x{" "}
                {dimensions.depth} cm
              </p>
              <p className="text-sm">Weight: {weight} kg</p>
              <p className="text-sm mt-2">Warranty: {warrantyInformation}</p>
              <p className="text-sm">Shipping: {shippingInformation}</p>
              <p className="text-sm mt-2">Availability: {availabilityStatus}</p>
              <p className="text-sm mt-2">Return Policy: {returnPolicy}</p>
              <p className="text-sm mt-2">SKU: {sku}</p>
              <div className="mt-5">
                <h2 className="text-xl font-bold">Tags:</h2>
                <div className="flex flex-wrap mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-800 text-white py-1 px-2 rounded-full text-xs mr-2 mt-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5">
              {addItemHandler && (
                <button
                  onClick={() => addItemHandler(product)}
                  className="mt-4 bg-purple-800 w-full text-xl p-5 font-bold hover:bg-purple-500"
                >
                  Add To Cart
                </button>
              )}
            </div>
            <div className="mt-5">
              <h2 className="text-xl font-bold">Reviews:</h2>
              <div className="mt-3 space-y-3">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg screen-max-6:w-auto">
                    <p className="text-sm text-gray-400">{review.date}</p>
                    <p className="font-bold">{review.reviewerName}</p>
                    <p className="text-sm">Rating: {review.rating} ⭐</p>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default ItemDetails;
