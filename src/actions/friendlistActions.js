import axios from 'axios';
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND_SUCCESS } from '../constants/friendlistConstants';

export const fetchFriendsSuccess = (friends) => ({
  type: FETCH_FRIENDS_SUCCESS,
  payload: friends,
});

export const addFriendSuccess = (friend) => ({
  type: ADD_FRIEND_SUCCESS,
  payload: friend,
});

export const fetchFriends = () => {
  return (dispatch) => {
    axios.get('https://prodjfrance.pythonanywhere.com/api/friends/')
      .then(response => {
        dispatch(fetchFriendsSuccess(response.data));
      });
  };
};

export const addFriend = (friendId) => {
  return (dispatch) => {
    axios.post('https://prodjfrance.pythonanywhere.com/api/friends/add/', { friend_id: friendId })
      .then(response => {
        dispatch(addFriendSuccess(response.data));
      });
  };
};

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
