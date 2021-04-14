import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createRootReducer from './reducers';
import { createBrowserHistory } from "history";
// import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [...getDefaultMiddleware({serializableCheck: false}), routerMiddleware(history)]
})

// export const persistor = persistStore(store);

export default store;