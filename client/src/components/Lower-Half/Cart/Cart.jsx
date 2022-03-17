import React from 'react'
import './Cart.css';
import dataContext from '../../../util/dataContext';

function CartComponent() {
    const {state} = React.useContext(dataContext);
  return (
    <div>
        <h1>Cart:</h1>
        <ul>
          {
            state.cart.map((item,id) => {
              return <li key={id}>{item.name} - &#8377;{item.price}</li>
            })
          }
        </ul>
    </div>
  )
}

export default CartComponent;