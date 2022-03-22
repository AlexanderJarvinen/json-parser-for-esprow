import { Entities, State } from './types';

export const entityInitialState: Entities = [];
export const entityLength: number = 0;


export const initialState: State = {
    entitesReducer: entityInitialState,
    entitesLengthReducer: 0

}
