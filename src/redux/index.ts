import {  createStore } from "redux";
import { entitesReducer } from "./reducers";
import { entityInitialState } from "./initialState";

export const store = createStore(entitesReducer, entityInitialState);
