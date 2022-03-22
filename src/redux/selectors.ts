import {  State } from './types';

export const getEntitesData = ({ entitesReducer }: State) => entitesReducer;
export const getEntitesLength = ({ entitesLengthReducer }: State) => entitesLengthReducer;

