import React from 'react';
import './Cards.css';
import dataContext from '../../../util/dataContext';
import {ADD_TO_CART, SET_SERVER_ERROR} from '../../../reducer/types';

function CardTemplateComponent(props) {
  const {name, category, price} = props;
  const {dispatch} = React.useContext(dataContext);

  function handleAddToCart(ItemAdded) {
    let serverError = "";
    dispatch({
      type: ADD_TO_CART,
      ...ItemAdded
    });
    dispatch({
      type: SET_SERVER_ERROR,
      serverError
    });
  }

  return (
    <div className='card-border'>
      <div className='card-background'>
        <div className='left'>
          <h4 className='name'>{name}</h4>
          <p className='category'>{category}</p>
        </div>
        <div className='right'>
          <div className='price'>{price}</div>
          <div className='atc-btn' onClick={() => handleAddToCart({name,category,price})}>Add to cart</div>
        </div>
      </div>
    </div>
  )
}

export default CardTemplateComponent;