import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import authReducer from './reducers/authReducer';
import spinnerReducer from './reducers/spinnerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  spinner: spinnerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.user && state.auth.token) {
    localStorage.setItem('user', JSON.stringify(state.auth.user));
    localStorage.setItem('token', state.auth.token);
  } else {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
});


export default store;