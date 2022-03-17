import React from 'react';
import './Cards.css';
import dataContext from '../../../util/dataContext';
import {ADD_TO_CART} from '../../../reducer/types';

function CardTemplateComponent(props) {
  const {name,category} = props;
  const {dispatch} = React.useContext(dataContext);

  function handleAddToCart(ItemAdded) {
    dispatch({
      type: ADD_TO_CART,
      ...ItemAdded
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
          <div className='price'>0</div>
          <div className='atc-btn' onClick={() => handleAddToCart({name,category,price:10})}>Add to cart</div>
        </div>
      </div>
    </div>
  )
}

export default CardTemplateComponent;