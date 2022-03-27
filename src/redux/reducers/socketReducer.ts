import produce from 'immer';
import { SocketReducerAction, SocketUser } from '../../model/redux';

export interface initialSocketReducerStateModel {
    drivers: Array<SocketUser>;
    passengers: Array<SocketUser>;
    error: any;
    loading: boolean;
}

const initialState: initialSocketReducerStateModel = {
    drivers: [],
    passengers: [],
    error: null,
    loading: false,
};

const socketReducer = (state = initialState, action: SocketReducerAction) => {
    switch (action.type) {
        case 'ADD_DRIVERS':
            return produce(state, (draft) => {
                draft.drivers = action.payload;
            });
        case 'ADD_PASSENGERS':
            return produce(state, (draft) => {
                draft.passengers = action.payload;
            });
        case 'DELETE_DRIVER':
            return produce(state, (draft) => {
                draft.drivers = action.payload;
            });
        case 'DELETE_PASSENGER':
            return produce(state, (draft) => {
                draft.passengers = action.payload;
            });
        default:
            return produce(state, () => {});
    }
};

export default socketReducer;
