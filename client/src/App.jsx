import React from 'react';
import './App.css';
import UpperHalf from './components/Upper-Half/UpperHalf';
import LowerHalf from './components/Lower-Half/LowerHalf';
import {reducer, initialState} from './reducer/Reducer';
import dataContext from './util/dataContext';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <dataContext.Provider value={{state,dispatch}}>
        <div className='upper-half'> 
          <UpperHalf/>
        </div>
        <div className='dividing-border'></div>
        <div className='lower-half'>
          <LowerHalf/>
        </div>
      </dataContext.Provider>
    </>
  );
}

export default App;