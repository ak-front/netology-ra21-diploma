import axios from 'axios';

import {
  SUBMIT_ORDER_ERROR,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS
} from './types';
import { notifyError } from './../../../utils';

const { REACT_APP_API_ORDER_URL } = process.env;

export const submitOrderError = error => ({
  type: SUBMIT_ORDER_ERROR,
  payload: {error}
});

export const submitOrderRequest = () => ({
  type: SUBMIT_ORDER_REQUEST
});

export const submitOrderSuccess = () => ({
  type: SUBMIT_ORDER_SUCCESS
});

export const submitOrder = (phone, address, products) => async (dispatch, getState) => {
  dispatch(submitOrderRequest());

  try {
    const response = await axios.post(REACT_APP_API_ORDER_URL, {
      owner: {
        phone: phone.replace(/\s/g, ''),
        address,
      },
      items: products.map(item => ({
        id: item.id,
        price: item.price,
        count: item.count
      }))
    });

    dispatch(submitOrderSuccess(response.data));
  } catch (error) {
    dispatch(submitOrderError(error));
    notifyError(`При оформлении заказа произошла ошибка: ${error.message}`);
  }
};
