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
    type: 'ADD_USER' | 'DELETE_USER' | 'UPDATE_USER' | 'GET_USER';
    payload: SocketUser;
}
