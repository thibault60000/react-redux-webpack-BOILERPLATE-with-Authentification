import rootReducer from '../reducers';

import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory();
const middlewares = [routerMiddleware(history)];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default { store, history };