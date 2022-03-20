import { AnyAction, combineReducers, Reducer } from 'redux';

import {
  SetEntitesAction,
    SetEntities
} from './actions';
import {
    entityInitialState
} from './initialState';
import {
    Entities,
    Entity
} from './types';

export const entitesReducer: Reducer<Entities, AnyAction | SetEntitesAction> = (
    store = entityInitialState,
    action,
) => {
    if (action.type === SetEntities) {
        return [...action.payload];
    }

    return store;
};





