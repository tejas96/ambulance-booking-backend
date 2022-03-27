import { UserRole } from './User';

export interface SocketUser {
    id?: string;
    name: string;
    city: string;
    userId: string;
    userRole: UserRole;
    lat: number;
    long: number;
    room: string;
}
export interface SocketReducerAction {
    type:
        | 'ADD_DRIVERS'
        | 'DELETE_DRIVER'
        | 'DELETE_PASSENGER'
        | 'UPDATE_USER'
        | 'GET_USER'
        | 'ADD_PASSENGERS';
    payload: Array<SocketUser>;
}
