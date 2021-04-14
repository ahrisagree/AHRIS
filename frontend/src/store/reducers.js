import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { getPersistedReducer } from './persist';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  // general: getPersistedReducer('general', general),
})

export default createRootReducer;