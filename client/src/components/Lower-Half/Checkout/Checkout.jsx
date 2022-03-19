import React from 'react';
import './Checkout.css';
import dataContext from '../../../util/dataContext';
import {SWITCH_TO_CREATE, SET_SERVER_ERROR} from '../../../reducer/types';

function CheckoutComponent() {
    const {state, dispatch} = React.useContext(dataContext);
    const [totalAmt, setTotalAmt] = React.useState(0);
    const [couponCode, setCouponCode] = React.useState('');

    function handleRedeemCoupon() {
      setServerError('');
      fetch('http://localhost:2030/redeem-coupon',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({couponCode,totalAmt})
      })
      .then(async (result) => {
        const data = await result.json();
        setCouponCode('');
        if(!result.ok){
          const error = data.message;
          return Promise.reject(error);
        }
        else {
          setTotalAmt(totalAmt - data.data);
        }
      })
      .catch((error) => {
        setServerError(error);
      });
    }

    React.useEffect(() => {
      (function() {
        let Cart = state.cart;
        let total = 0;
        for (const product of Cart){
          total += product.price;
        }
        setTotalAmt(total);
      })();
    },[state.cart]);

    function handleCouponCode(e) {
      setCouponCode(e.target.value);
    }

    function handleCreateCouponBtn(switchVal) {
        dispatch({
            type: SWITCH_TO_CREATE,
            switchVal
        })
    }

    function setServerError(serverError) {
        dispatch({
            type: SET_SERVER_ERROR,
            serverError
        })
    }

  return (
    <div>
        <h1>Checkout:</h1>
        <p>Total Items: <b>{state.cart.length}</b></p>
        <label htmlFor='couponCode'>Redeem Coupon: <input name='couponCode' type='text' value={couponCode} onChange={handleCouponCode} /> </label>
        <div className='after-applyBtn'>
          <div className='apply-btn' onClick={() => {handleRedeemCoupon()}}>Apply</div>
          <p className='p-error'>{state.serverError}</p>
        </div>
        <p>Total Amount: <b>&#8377;{totalAmt ? totalAmt : 0}</b></p>
        <div className='coupon-btn' onClick={() => handleCreateCouponBtn(true)}>Create Coupon</div>
    </div>
  )
}

export default CheckoutComponent;