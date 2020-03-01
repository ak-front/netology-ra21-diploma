const SUBMIT_ORDER_ERROR = 'SUBMIT_ORDER_ERROR';
const SUBMIT_ORDER_REQUEST = 'SUBMIT_ORDER_REQUEST';
const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';

const initialState = {
  error: null,
  isSubmitting: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
        isSubmitting: false
      };
    }

    case SUBMIT_ORDER_REQUEST: {
      return {
        ...state,
        error: null,
        isSubmitting: true
      };
    }

    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        error: null,
        isSubmitting: false
      };
    }

    default: {
      return state;
    }
  }
};

export default orderReducer;
