import React from 'react'
import './ListOfCoupons.css';
import dataContext from '../../../util/dataContext';

function ListOfCouponsComponents() {
  const {state} = React.useContext(dataContext);
  const [allCoupons, setAllCoupons] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:2030/coupon-codes')
    .then(async (val) => {
      let coupons = await val.json();
      console.log(coupons);
      setAllCoupons(coupons);
    })
    .catch(err => console.log(err));
  },[state])

  return (
    <div>
        <h1>List of Coupons:</h1>
        <ul className='list-of-coupons'>
          {allCoupons.map((coupon,id) => {
            return <li key={id} className='coupon'>{coupon.code}</li>
          })}
        </ul>
    </div>
  )
}

export default ListOfCouponsComponents;