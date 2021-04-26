import notificationTypes from './notification.types';

const INITIAL_STATE = {
  items: []
}

const notificationReducer = (state = INITIAL_STATE, action ) => {
  switch(action.type) {
    case notificationTypes.PUSH_NOTE:
      return {
        ...state,
        items: [ ...state.items , action.payload] 
      }
    case notificationTypes.REMOVE_NOTE:
      return {
        items: state.items.filter(item => item !== action.payload)
      }
    default:
      return state
  }
}

export default notificationReducer;