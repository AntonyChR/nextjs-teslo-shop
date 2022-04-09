import { IUser } from "../../interfaces";


export type AuthActionType =
    | { type: 'auth - login', payload: IUser }
    | { type: 'auth - logout' }