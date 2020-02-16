import { combineReducers } from 'redux';

import catalogReducer from './catalog';
import topSalesReducer from './topSales';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  topSales: topSalesReducer
});

export default rootReducer;
