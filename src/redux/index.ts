import { combineReducers, createStore, applyMiddleware } from 'redux';
import { entitesReducer, entitesLengthReducer } from "./reducers";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));


const combine = combineReducers(
    {
        entitesReducer,
        entitesLengthReducer
    }
);

export const store = createStore(combine, composedEnhancer);
