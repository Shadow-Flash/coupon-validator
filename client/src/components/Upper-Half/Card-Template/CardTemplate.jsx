import React from 'react';
import './Cards.css';

function CardTemplateComponent(props) {
  const {name,category} = props;
  return (
    <div className='card-border'>
      <div className='card-background'>
        <div className='left'>
          <h4 className='name'>{name}</h4>
          <p className='category'>{category}</p>
        </div>
        <div className='right'>
          <div className='price'>{Math.floor((Math.random() * 5000) + 1)}</div>
          <div className='atc-btn'>Add to cart</div>
        </div>
      </div>
    </div>
  )
}

export default CardTemplateComponent;