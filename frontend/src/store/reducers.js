import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { getPersistedReducer } from './persist';
import auth from 'store/auth';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  // general: getPersistedReducer('general', general),
  auth: getPersistedReducer('auth', auth, ['token', 'user'])
})

export default createRootReducer;