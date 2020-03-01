import { combineReducers } from 'redux';

import catalogReducer from './catalog';
import orderReducer from './order';
import topSalesReducer from './topSales';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  order: orderReducer,
  topSales: topSalesReducer
});

export default rootReducer;
