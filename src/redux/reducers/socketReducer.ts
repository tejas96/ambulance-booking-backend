import { SocketReducerAction, SocketUser } from '../../model/redux';
import produce from 'immer';

export interface initialSocketReducerStateModel {
    users: Array<SocketUser>;
    error: any;
    loading: boolean;
}

const initialState: initialSocketReducerStateModel = {
    users: [],
    error: null,
    loading: false,
};

const socketReducer = (state = initialState, action: SocketReducerAction) => {
    switch (action.type) {
        case 'ADD_USER':
            return produce(state, (draft) => {
                draft.users.push(action.payload);
            });
        case 'DELETE_USER':
            return {};
        case 'UPDATE_USER':
            return {};
        default:
            return produce(state, () => {});
    }
};

export default socketReducer;
