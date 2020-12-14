import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import ReduxPromise from 'redux-promise';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk, ReduxLogger, ReduxPromise),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;