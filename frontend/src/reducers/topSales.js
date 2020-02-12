import {
  FETCH_TOP_SALES_ERROR,
  FETCH_TOP_SALES_REQUEST,
  FETCH_TOP_SALES_SUCCESS,
} from './../constants/actionTypes';

const initialState = {
  error: null,
  isLoading: false,
  items: []
};

const topSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_SALES_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
        isLoading: false
      };
    }

    case FETCH_TOP_SALES_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true
      };
    }

    case FETCH_TOP_SALES_SUCCESS: {
      const { items } = action.payload;

      return {
        ...state,
        items,
        error: null,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
};

export default topSalesReducer;
