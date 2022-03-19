import React from 'react';
import './UpperHalf.css';
import CardTemplate from './Card-Template/CardTemplate';
import {cardsContent} from './Card-Template/CardContent';

function UpperHalfComponent() {
  return (
    <>
    <h1 className='heading'>Buy Clothes:</h1>
    <div className='upper-half-display'>
        {cardsContent.map((cardVal,id) => {
            return <CardTemplate key={id} name={cardVal.name} category={cardVal.category} price={cardVal.price}/>
        })}
    </div>
    </>
  )
}

export default UpperHalfComponent;