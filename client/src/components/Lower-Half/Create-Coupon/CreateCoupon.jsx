import React from 'react';
import './CreateCoupon.css';
import dataContext from '../../../util/dataContext';
import {SWITCH_TO_CREATE, ADD_COUPON} from '../../../reducer/types';
import { initState }  from './inputInitialState';
import { validateFormInput } from '../../../util/validation';

function CreateCouponComponent() {
    const {dispatch} = React.useContext(dataContext);
    const [coupon, setCoupon] = React.useState(initState);
    const [serverError, setServerError] = React.useState('');
    let errors = {};

    function handleSubmitCouponBtn(e) {
        e.preventDefault();
        sendTheRequest().then(() => {
            let newCoupon = {};
            Object.entries(coupon).forEach(values => {
                newCoupon[values[0]] = values[1].value;
            })
            fetch('/create-coupon',{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(newCoupon)
            })
            .then(async result => {
                const data = await result.json();
                if(!result.ok){
                    const error = data.message;
                    console.log(error);
                    return Promise.reject(error);
                }
                dispatch({type: ADD_COUPON});
                setCoupon(initState);
            })
            .catch(err => setServerError(err));
        })
        .catch(() => {
            console.log("CANCELLED!!");
        })
    }

    function updateStateError(field, error) {
        setCoupon((prev) => ({
             ...prev,
            [field]: {
                ...prev[field],
                error
            }
        }))
    }

    function validateFields() {
        Object.entries(coupon).forEach((value) => {
            validateFormInput(errors, value, coupon.typeOfCode.value);
        })
        Object.keys(errors).forEach(val => {
            updateStateError(val,errors[val]);
        })
    }

    function handleInputChange(e) {
        setCoupon({
            ...coupon,
            [e.target.name]: {
                ...coupon[e.target.name],
                value: e.target.value
            }
        })
    }

    function sendTheRequest() {
        validateFields();
        return new Promise((resolve, reject) => {
            Object.values(errors).forEach((val) => {
                if(val !== ""){
                    reject();
                }
            })
            resolve();
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
                Type of Discount:
            </label>
            <select className='mid-size' name='typeOfCode' value={coupon.typeOfCode.value} onChange={handleInputChange}>
                <option value='flat'>Flat</option>
                <option value='upto'>Upto</option>
            </select>
            {coupon.typeOfCode.error ? <p className='error'>{coupon.typeOfCode.error}</p> : null}
            <br></br>
            <label htmlFor='code'>
                Coupon Code:
                <input className='mid-size' name='code' type='text' value={coupon.code.value} onChange={handleInputChange}/>
                {coupon.code.error ? <p className='error'>{coupon.code.error}</p> : null}
            </label>
            <br></br>
            <label htmlFor='desc'>
                Description: 
                <input className='large-size' name='desc' type='text' value={coupon.desc.value} onChange={handleInputChange}/>
                {coupon.desc.error ? <p className='error'>{coupon.desc.error}</p> : null}
            </label>
            <br></br>
            {coupon.typeOfCode.value === 'upto' ? <label htmlFor='percentDeduct'>
                How much percent discount:
                <input className='mid-size' name='percentDeduct' type='number' value={coupon.percentDeduct.value} onChange={handleInputChange}/>
                {coupon.percentDeduct.error ? <p className='error'>{coupon.percentDeduct.error}</p> : null}
            </label> :
            <label htmlFor='priceDeduct'>
                Price to deduct:
                <input className='mid-size' name='priceDeduct' type='number' value={coupon.priceDeduct.value} onChange={handleInputChange}/>
                {coupon.priceDeduct.error ? <p className='error'>{coupon.priceDeduct.error}</p> : null}
            </label> }
            <br></br>
            <label htmlFor='sd'>
                Start Date:
                <input className='large-size' name='sd' type='date' value={coupon.sd.value} onChange={handleInputChange}/>
                {coupon.sd.error ? <p className='error'>{coupon.sd.error}</p> : null}
            </label>
            <br></br>
            <label htmlFor='ed'>
                End Date:
                <input className='large-size' name='ed' type='date' value={coupon.ed.value} onChange={handleInputChange}/>
                {coupon.ed.error ? <p className='error'>{coupon.ed.error}</p> : null}
            </label>
            <br></br>
            <label htmlFor='minAmt'>
                Minimum amount to apply:
                <input className='mid-size' name='minAmt' type='number' value={coupon.minAmt.value} onChange={handleInputChange}/>
                {coupon.minAmt.error ? <p className='error'>{coupon.minAmt.error}</p> : null}
            </label>
            <br></br>
           {coupon.typeOfCode.value === 'upto' ? <label htmlFor='maxPercent'>
                Maximum amount to be discounted:
                <input className='mid-size' name='maxPercent' type='number' value={coupon.maxPercent.value} onChange={handleInputChange}/>
                {coupon.maxPercent.error ? <p className='error'>{coupon.maxPercent.error}</p> : null}
            </label> : null}
            <div className='buttons'>
                <button className='submit-coupon-btn'>Submit</button>
                <div className='back-btn' onClick={() => handleBackBtn(false)}>Back</div>
            </div>
            {serverError ? <p className='server-error'>{serverError}</p> : null}
        </form>
    </div>
  )
}

export default CreateCouponComponent;