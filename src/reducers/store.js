import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reportsReducers } from './reports';

const reducers = combineReducers({
    report: reportsReducers
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;