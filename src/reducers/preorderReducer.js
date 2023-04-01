import {
    PREORDER_ADD_ITEM,
    PREORDER_REMOVE_ITEM
  } from '../constants/preorderConstants';
  
  const preorderItemsFromStorage = localStorage.getItem('preorderItems') ? 
      JSON.parse(localStorage.getItem('preorderItems')) : [];
  
  export const preorderReducer = (state = { preorderItems: preorderItemsFromStorage }, action) => {
    switch (action.type) {
        case PREORDER_ADD_ITEM:
            const item = action.payload;
            const existItem = state.preorderItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    preorderItems: state.preorderItems
                };
            } else {
                return {
                    ...state,
                    preorderItems: [...state.preorderItems, item],
                };
            }
        case PREORDER_REMOVE_ITEM:
            return {
                ...state,
                preorderItems: state.preorderItems.filter(x => x.product !== action.payload),
            };
        default:
            return state;
    }
  };
  