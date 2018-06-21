import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reportsReducers } from './reports';
import { applicationReducer } from './application';

const logger = createLogger();

const reducers = combineReducers({
    report: reportsReducers,
    application: applicationReducer
});

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;