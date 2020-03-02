import { combineReducers } from 'redux';

import catalogReducer from './catalog/reducer';
import orderReducer from './order/reducer';
import topSalesReducer from './topSales/reducer';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  order: orderReducer,
  topSales: topSalesReducer
});

export default rootReducer;
