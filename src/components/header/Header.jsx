import React from 'react'
import SearchBar from '../search-bar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  //used useNavigate to navigate to different pages
    //totalItemsInCart will get updated every time the cart gets updated
  const navigate = useNavigate();
  const totalItemsInCart = useSelector(state => state.cart.totalItemsInCart);

  return (
    <>  
        <div className="w-full flex fixed bg-gray-900 p-3 justify-evenly text-4xl screen-max-9:gap-2 screen-max-9:flex-col screen-max-9:items-center">
        <h1 className="font-medium text-yellow-500 screen-max-9:pl-10 cursor-pointer" onClick={() => navigate("/productList", { state: { refresh: true } })}>
          ShoppyGlobe
        </h1>
        <SearchBar className={"screen-max-9:w-[250px] -ml-20 flex items-center mb-2 screen-max-9:pt-3"}/>

        <div className="text-yellow-500 text-xl mt-2 screen-max-9:pl-10">
          <ul className="flex gap-5">
            <li
              className="hover:bg-yellow-300 hover:text-gray-900 cursor-pointer p-2"
              onClick={() => navigate("/productList", { state: { refresh: true } })}
            >
              Home
            </li>
            <li
              className="relative hover:bg-yellow-300 hover:text-gray-900 cursor-pointer p-2"
              onClick={() => navigate("/cart", { state: { refresh: true } })}
            >
              <div className="flex h-fit">
                <p>Cart</p>
                <p className="absolute top-0 right-0 w-6 h-6 transform translate-x-1/2 -translate-y-1/2 text-base pl-2 font-bold text-black bg-yellow-600 rounded-full">
                  {totalItemsInCart}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header;
