import { ADD_MESSAGE } from '../constants/chatboxConstants';

const initialState = {
  messages: []
};

export const chatboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};