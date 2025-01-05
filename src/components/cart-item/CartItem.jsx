import React from 'react'
import { useSelector } from 'react-redux';

const CartItem = () => {

  const cartArray = useSelector((state) => state.cart.cartArray);

  return (
    <>
        <div className=''>



        </div>
    </>
  )
}

export default CartItem;