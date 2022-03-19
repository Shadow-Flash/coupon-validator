import React from 'react'
import './ListOfCoupons.css';
import dataContext from '../../../util/dataContext';

function ListOfCouponsComponents() {
  const {state} = React.useContext(dataContext);
  const [allCoupons, setAllCoupons] = React.useState([]);
  const [showServerErr, setShowServerErr] = React.useState('');
  const [showCoupon, setShowCoupon] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:2030/coupon-codes')
    .then(async (val) => {
      let coupons = await val.json();
      if(!val.ok){
          const error = coupons.message;
          return Promise.reject(error);
      }
      else {
        setAllCoupons(coupons);
      }
    })
    .catch(err => setShowServerErr(err));
  },[state])

  function handleToShowOrHide() {
    setShowCoupon(!showCoupon);
  }

  return (
    <div>
        <h1>List of Coupons:</h1>
        {showCoupon ? <ul className='list-of-coupons'>
          {allCoupons.map((coupon,id) => {
            return <li key={id} className='coupon'>{coupon.code} <p className='coupon-desc'> -  {coupon.desc}</p></li>
          })}
          {showServerErr ? showServerErr : null}
        </ul> : null}
        <button className='hideAndShow-btn' onClick={() => {handleToShowOrHide()}}>{showCoupon ? "Hide" : "Show"}</button>
    </div>
  )
}

export default ListOfCouponsComponents;