import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND_SUCCESS } from '../constants/friendlistConstants';
const initialState = {
  friends: []
};

const friendListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload
      };
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [...state.friends, action.payload]
      };
    default:
      return state;
  }
};

export default friendListReducer;
