import { cartActionTypes } from './cart.types';
import  userActionTypes  from '../user/user.types';

import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action ) => {
    switch(action.type) {
    case cartActionTypes.TOGGLE_HIDDEN :
      return {
        ...state,
        hidden: !state.hidden
      }
    case cartActionTypes.ADD_ITEM :
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return{
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      }
      case cartActionTypes.REMOVE_ITEM :
        return {
          ...state,
          cartItems: removeItemFromCart(state.cartItems, action.payload)
        }
      case cartActionTypes.CLEAR_CART:
        return {
          ...state,
          cartItems: []
        }
      case userActionTypes.SIGN_IN_SUCCESS :
        return {
          ...state,
          cartItems: action.payload['cartItems']
        }
    default:
      return state;  
  }
}

export default cartReducer;