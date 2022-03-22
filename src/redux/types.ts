
export type Entities = Entity[];

export type Entity = {
    id: string;
    isActive: boolean;
    picture: string;
    age: number;
    name: string;
    email: string;
    address: string;
    about: string;
    registered: string;
    disabled: boolean;
}

export type State = {
    entitesReducer: Entities;
    entitesLengthReducer: number;
};
