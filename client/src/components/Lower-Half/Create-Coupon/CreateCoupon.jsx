import React from 'react';
import './CreateCoupon.css';
import dataContext from '../../../util/dataContext';
import {SWITCH_TO_CREATE, ADD_COUPON} from '../../../reducer/types';

function CreateCouponComponent() {
    const {dispatch} = React.useContext(dataContext);
    const initState = {
        typeOfCode: 'flat',
        code: '',
        desc: '',
        priceDeduct: '',
        sd: '',
        ed: '',
        minAmt: '',
        percentDeduct: '',
        maxPercent: ''
    };
    const [coupon, setCoupon] = React.useState(initState);

    function handleSubmitCouponBtn(e) {
        e.preventDefault();
        fetch('http://localhost:2030/create-coupon',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(coupon)
        })
        .then(result => {
            result.json().then(res => {
                dispatch({type: ADD_COUPON});
                setCoupon(initState);
                console.log(res);
            })
        })
        .catch(err => console.log(err));
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
            <label htmlFor='typeOfCode'>
                Type of Coupon:
            </label>
            <select className='mid-size' name='typeOfCode' value={coupon.typeOfCode} onChange={handleInputChange}>
                <option value='flat'>Flat</option>
                <option value='upto'>Upto</option>
            </select>
            <br></br>
            <label htmlFor='code'>
                Coupon Code:
                <input className='mid-size' name='code' type='text' value={coupon.code} onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='desc'>
                Description: 
                <input className='large-size' name='desc' type='text' value={coupon.desc} onChange={handleInputChange}/>
            </label>
            <br></br>
            {coupon.typeOfCode === 'upto' ? <label htmlFor='percentDeduct'>
                Percent discount to deduct:
                <input className='mid-size' name='percentDeduct' type='number' value={coupon.percentDeduct} onChange={handleInputChange}/>
            </label> :
            <label htmlFor='priceDeduct'>
                Price to deduct:
                <input className='mid-size' name='priceDeduct' type='number' value={coupon.priceDeduct} onChange={handleInputChange}/>
            </label> }
            <br></br>
            <label htmlFor='sd'>
                Start Date:
                <input className='large-size' name='sd' type='datetime-local' value={coupon.sd} onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='ed'>
                End Date:
                <input className='large-size' name='ed' type='datetime-local' value={coupon.ed} onChange={handleInputChange}/>
            </label>
            <br></br>
            <label htmlFor='minAmt'>
                Minimum amount:
                <input className='mid-size' name='minAmt' type='number' value={coupon.minAmt} onChange={handleInputChange}/>
            </label>
            <br></br>
           {coupon.typeOfCode === 'upto' ? <label htmlFor='maxPercent'>
                Maximum Percentage Discount:
                <input className='mid-size' name='maxPercent' type='number' value={coupon.maxPercent} onChange={handleInputChange}/>
            </label> : null}
            <div className='buttons'>
                <button className='submit-coupon-btn'>Submit</button>
                <div className='back-btn' onClick={() => handleBackBtn(false)}>Back</div>
            </div>
        </form>
    </div>
  )
}

export default CreateCouponComponent;