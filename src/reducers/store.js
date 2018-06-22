import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reportsReducers } from './reports';
import { applicationReducer } from './application';
import { dashboardReducer } from './dashboard';

const logger = createLogger();

const reducers = combineReducers({
    dashboard: dashboardReducer,
    report: reportsReducers,
    application: applicationReducer
});

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;