import { AnyAction, Reducer } from 'redux';

import {
  SetEntitesAction,
  SetEntities,
  SetEntitesLengthAction,
  SetEntitiesLength

} from './actions';
import {
    entityInitialState,
    entityLength
} from './initialState';
import {
    Entities,
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

export const entitesLengthReducer: Reducer<number, AnyAction |  SetEntitesLengthAction> = (store = entityLength, action)  => {
    if (action.type === SetEntitiesLength) {
        return action.payload;
    }

    return store;
};






