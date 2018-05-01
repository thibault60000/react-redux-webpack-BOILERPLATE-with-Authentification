import React from 'react';

import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import RootContainer from './RootContainer';

import rootReducer from '../../reducers';

class App extends React.Component {
  history;
  store;
  middlewares = [];

  constructor() {
    super();

    this.history = createHistory();
    this.middlewares = [routerMiddleware(this.history)];
    this.store = createStore(
      rootReducer,
      applyMiddleware(...this.middlewares)
    );
  }

  
  render() {
    return (
      <Provider store={this.store}>
        <RootContainer history={this.history} />
      </Provider>
    );
  }
}

export default App;
