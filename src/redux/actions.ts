import { Action } from 'redux';

import { Entities } from './types';

export const SetEntities = 'setEntities';

export type SetEntitesAction = Action<typeof SetEntities> & {
    payload: Entities;
};
