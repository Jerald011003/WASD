import axios from 'axios';
import {
    WISH_ADD_ITEM,
    WISH_REMOVE_ITEM
} from '../constants/wishConstants';

export const addToWishlist = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://prodjfrance.pythonanywhere.com/api/wish/${id}`);
    dispatch({
        type: WISH_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
        }
    });
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISH_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};
