import axios from 'axios';
import {
    PREORDER_ADD_ITEM,
    PREORDER_REMOVE_ITEM
} from '../constants/preorderConstants';

export const addToPreorder = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://prodjfrance.pythonanywhere.com/api/products/${id}`);

    dispatch({
        type: PREORDER_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
            preorderdate: data.preorderdate,
        },
    });
    

    localStorage.setItem(
        'preorderItems',
        JSON.stringify(getState().preorder.preorderItems)
    );
};


export const removeFromPreorder = (id) => (dispatch, getState) => {
    dispatch({
        type: PREORDER_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        'preorderItems',
        JSON.stringify(getState().preorder.preorderItems)
    );
};