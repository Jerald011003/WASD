export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (text) => (dispatch, getState) => {
  const userInfo = getState().userLogin.userInfo;
  const name = userInfo ? userInfo.name : 'Anonymous';
  dispatch({
    type: ADD_MESSAGE,
    payload: { name, text }
  });
};