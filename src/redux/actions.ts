import { Action } from 'redux';
import { Entities, Entity } from './types';
import source from "../utils/test_source.json";

export const SetEntities = 'setEntities';
export const SetEntitiesLength = 'setEntitiesLength';

export type SetEntitesAction = Action<typeof SetEntities> & {
    payload: Entities;
};

export type SetEntitesLengthAction = Action<typeof SetEntitiesLength> & {
    payload: number;
};

export const setEntitesData = (data: Entities): SetEntitesAction => ({
    type: SetEntities,
    payload: data,
});

export const setEntitesLengthData = (length: number): SetEntitesLengthAction => ({
    type: SetEntitiesLength,
    payload: length,
});

export const setEntities = (index: number = 0)  => {
    return async (dispatch: (param: SetEntitesAction) => void) => {
        let start:number = 0;
        let end: number = 0;

        if(index === 0) {
            start = 0;
            end = 1;
        } else if (index === source.length) {
            start = index - 2;
            end = index;
        } else {
            start = index - 1;
            end = index + 1;
        }


        const result: Entity[] = (source.slice(start, end) as Entities).map((item, i) => {
            if (index === 1) {
                if (i === 0) {
                    item.disabled = false;
                } else {
                    item.disabled = true;
                }
            } else {
                if (i === 0) {
                    item.disabled = true;
                } else {
                    item.disabled = false;
                }
            }




            return  item;
        })

        dispatch(setEntitesData(result));
    };
};


export const loadEntitiesLength = ()  => {
    return async (dispatch: (param: SetEntitesLengthAction) => void) => {
        dispatch(setEntitesLengthData(source.length));
    };
};
