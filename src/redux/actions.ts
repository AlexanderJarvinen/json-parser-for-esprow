import { Action } from 'redux';
import { Entities } from './types';
import source from "../utils/source.json";

export const SetEntities = 'setEntities';

export type SetEntitesAction = Action<typeof SetEntities> & {
    payload: Entities;
};

export const setEntitesData = (data: Entities): SetEntitesAction => ({
    type: SetEntities,
    payload: data,
});

export const setEntities = ()  => {
    return async (dispatch: (param: SetEntitesAction) => void) => {
        dispatch(setEntitesData(source));
    };
};
