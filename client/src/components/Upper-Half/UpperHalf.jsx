import React from 'react';
import './UpperHalf.css';
import CardTemplate from './Card-Template/CardTemplate';
import {cardsContent} from './Card-Template/CardContent';

function UpperHalfComponent() {
  return (
    <>
    <h1 className='heading'>Buy Drinks:</h1>
    <div className='upper-half-display'>
        {cardsContent.map((cardVal,id) => {
            return <CardTemplate name={cardVal.name} category={cardVal.category}/>
        })}
    </div>
    </>
  )
}

export default UpperHalfComponent;