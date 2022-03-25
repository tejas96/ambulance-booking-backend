import { createStore } from 'redux';
import allReducers from './reducers';

export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
