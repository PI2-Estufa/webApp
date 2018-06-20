import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reportsReducers } from './reports';
import { applicationReducer } from './application';

const reducers = combineReducers({
    report: reportsReducers,
    application: applicationReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;