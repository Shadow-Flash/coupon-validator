import React from 'react';
import './App.css';
import UpperHalf from './components/Upper-Half/UpperHalf';
import LowerHalf from './components/Lower-Half/LowerHalf';

function App() {
  return (
    <>
      <div className='upper-half'> 
        <UpperHalf/>
      </div>
      <div className='dividing-border'></div>
      <div className='lower-half'>
        <LowerHalf/>
      </div>
    </>
  );
}

export default App;