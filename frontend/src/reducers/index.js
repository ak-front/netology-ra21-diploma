import { combineReducers } from 'redux';

import topSalesReducer from '../reducers/topSales';

const rootReducer = combineReducers({
  topSales: topSalesReducer
});

export default rootReducer;
