import axios from 'axios';

import {
  FETCH_TOP_SALES_ERROR,
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
} from './types';

const { REACT_APP_API_TOP_SALES_URL } = process.env;

export const fetchTopSalesError = error => {
  return {
    type: FETCH_TOP_SALES_ERROR,
    payload: {error}
  };
};

export const fetchTopSalesRequest = () => ({
  type: FETCH_TOP_SALES_REQUEST
});

export const fetchTopSalesSuccess = items => ({
  type: FETCH_TOP_SALES_SUCCESS,
  payload: {items}
});

export const fetchTopSales = () => async (dispatch, getState) => {
  dispatch(fetchTopSalesRequest());

  try {
    const response = await axios.get(REACT_APP_API_TOP_SALES_URL);

    dispatch(fetchTopSalesSuccess(response.data));
  } catch (error) {
    dispatch(fetchTopSalesError(error));

    return Promise.reject(error.message);
  }
};
