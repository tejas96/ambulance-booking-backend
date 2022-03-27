import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
const allReducers = combineReducers({
    socketReducer,
});

export default allReducers;
