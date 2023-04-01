import {
  WISH_ADD_ITEM,
  WISH_REMOVE_ITEM
} from '../constants/wishConstants';

const wishlistItemsFromStorage = localStorage.getItem('wishlistItems') ? 
    JSON.parse(localStorage.getItem('wishlistItems')) : [];

export const wishReducer = (state = { wishlistItems: wishlistItemsFromStorage }, action) => {
  switch (action.type) {
      case WISH_ADD_ITEM:
          const item = action.payload;
          const existItem = state.wishlistItems.find(x => x.product === item.product);
          if (existItem) {
              return {
                  ...state,
                  wishlistItems: state.wishlistItems
              };
          } else {
              return {
                  ...state,
                  wishlistItems: [...state.wishlistItems, item],
              };
          }
      case WISH_REMOVE_ITEM:
          return {
              ...state,
              wishlistItems: state.wishlistItems.filter(x => x.product !== action.payload),
          };
      default:
          return state;
  }
};
