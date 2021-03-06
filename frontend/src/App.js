import React from 'react';
import { Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store, { history, persistor } from './store';
import routes from './routes';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationDrawer from 'components/NavigationDrawer';
import PrivateRoute from 'components/PrivateRoute';
// import { setupAuthToken } from 'api/setup';

function App() {
  // useEffect(()=>{
  //   setupAuthToken(store.getState().auth.token)
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <NavigationDrawer>
            <Switch>
              {routes.map(routeProps => (
                <PrivateRoute {...routeProps} key={routeProps.path} />
              ))}
            </Switch>
          </NavigationDrawer>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
