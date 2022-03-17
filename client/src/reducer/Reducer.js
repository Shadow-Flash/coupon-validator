import { ADD_TO_CART, ADD_COUPON, SWITCH_TO_CREATE } from "./types";

const initialState = {
    name: "",
    category: "",
    price: 0,
    cart: [],
    couponCount: 0,
    createMode: false,
}

const reducer = (state, action) => {
    if(state === undefined) state = initialState;
    console.log({state,action});
    const {name,category,price} = action;
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, {name,category,price}]
            }
        case ADD_COUPON:
            return {
                ...state,
                couponCount: state.couponCount++
            }
        case SWITCH_TO_CREATE:
            return {
                ...state,
                createMode: action.switchVal
            }
        default:
            return state;
    }
    
}

export {
    reducer,
    initialState
}