import React from 'react'
import './LowerHalf.css';
import dataContext from '../../util/dataContext';
import CheckoutComponent from './Checkout/Checkout';
import CreateCouponComponent from './Create-Coupon/CreateCoupon';
import CartComponent from './Cart/Cart';
import ListOfCouponsComponents from './ListOfCoupons/ListOfCoupons';

function LowerHalfComponent() {
  const {state} = React.useContext(dataContext);

  return (
    <div className='lower-container'>
      <div className='left-container'>
        <CartComponent/>
      </div>
      <div style={{border: "10px solid black"}}></div>
      <div className='right-container'>
        {state.createMode ? <CreateCouponComponent/> : <CheckoutComponent/>}
      </div>
      <div style={{border: "10px solid black"}}></div>
      <div className='right-container'>
        <ListOfCouponsComponents/>
      </div>
    </div>
  )
}

export default LowerHalfComponent;