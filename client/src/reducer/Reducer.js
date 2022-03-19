import { ADD_TO_CART, ADD_COUPON, SWITCH_TO_CREATE, SET_SERVER_ERROR } from "./types";

const initialState = {
    name: "",
    category: "",
    price: 0,
    cart: [],
    couponCount: 0,
    createMode: false,
    serverError: ""
}

const reducer = (state, action) => {
    if(state === undefined) state = initialState;
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
        case SET_SERVER_ERROR:
            return {
                ...state,
                serverError: action.serverError
            }
        default:
            return state;
    }
    
}

export {
    reducer,
    initialState
}