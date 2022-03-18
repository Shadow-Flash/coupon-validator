import React from 'react';
import './Checkout.css';
import dataContext from '../../../util/dataContext';
import {SWITCH_TO_CREATE} from '../../../reducer/types';

function CheckoutComponent() {
    const {state, dispatch} = React.useContext(dataContext);

    function totalPrice(Cart){
        let total = 0;
        for (const product of Cart){
          total += product.price;
        }
        return total;
    }

    function handleCreateCouponBtn(switchVal) {
        dispatch({
            type: SWITCH_TO_CREATE,
            switchVal
        })
    }

  return (
    <div>
        <h1>Checkout:</h1>
        <p>Total Items: <b>{state.cart.length}</b></p>
        <label>Redeem Coupon: <input name='coupon' type='text'/> </label>
        <div className='apply-btn' onClick={() => {}}>Apply</div>
        <p>Total Amount: <b>&#8377;{state.cart.length ? totalPrice(state.cart) : 0}</b></p>
        <div className='coupon-btn' onClick={() => handleCreateCouponBtn(true)}>Create Coupon</div>
    </div>
  )
}

export default CheckoutComponent;