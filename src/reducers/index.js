import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import articleReducer from './article';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  articleState: articleReducer,
});

export default rootReducer;
