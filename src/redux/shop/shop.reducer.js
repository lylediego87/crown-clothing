import { shopActionTypes } from './shop.types';

const INITIAL_STATE = {
  collections: null,
  isFecthing: false,
  errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case shopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFecthing: true
      }
     case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
       return {
         ...state,
         isFecthing: false,
         collections: action.payload
       }
    case shopActionTypes.FETCH_COLLECTIONS_FAILURE: 
      return {
        ...state,
        isFecthing: false,
        errorMessage: action.payload

      }
    default: return state
  }
}

export default shopReducer;