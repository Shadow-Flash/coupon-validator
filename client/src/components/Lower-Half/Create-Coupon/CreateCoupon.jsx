import React from 'react';
import './CreateCoupon.css';
import dataContext from '../../../util/dataContext';
import {SWITCH_TO_CREATE} from '../../../reducer/types';

function CreateCouponComponent() {
    const {dispatch} = React.useContext(dataContext);
    const [coupon, setCoupon] = React.useState({type: 'flat'})

    function handleSubmitCouponBtn(e) {
        e.preventDefault();
    }

    function handleInputChange(e) {
        setCoupon({
            ...coupon,
            [e.target.name]: e.target.value
        })
    }

    function handleBackBtn(switchVal) {
        dispatch({
            type: SWITCH_TO_CREATE,
            switchVal
        })
    }

  return (
    <div>
        <h1>Create Coupon:</h1>
        <form onSubmit={(e) => handleSubmitCouponBtn(e)}>
            <label htmlFor='type'>
                Type of Coupon:
            </label>
            <select name='type' onChange={handleInputChange}>
                <option value='flat'>Flat</option>
                <option value='upto'>Upto</option>
            </select>
            <br></br>
            <label htmlFor='code'>
                Coupon Code:
                <input name='code' type='text'onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='desc'>
                Description: 
                <input name='desc' type='text' onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='sd'>
                Start Date:
                <input name='sd' type='datetime-local' onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='ed'>
                End Date:
                <input name='ed' type='datetime-local' onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='minAmt'>
                Minimum amount:
                <input name='minAmt' type='number' onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='maxPercent'>
                Maximum Percentage Discount:
                <input name='maxPercent' type='number' onChange={handleInputChange}/>
            </label>
            <div className='buttons'>
                <button className='submit-coupon-btn'>Submit</button>
                <div className='back-btn' onClick={() => handleBackBtn(false)}>Back</div>
            </div>
        </form>
    </div>
  )
}

export default CreateCouponComponent;