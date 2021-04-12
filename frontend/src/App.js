import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store, { history, persistor } from './store';
import routes from './routes';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            {routes.map(routeProps => (
              <Route {...routeProps} key={routeProps.path} />
            ))}
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
