import { SocketUser } from '../model/redux';
import { initialSocketReducerStateModel } from '../redux/reducers/socketReducer';
import { store } from '../redux/store';

class SocketActions {
    getUsers() {
        const socketReducer = store.getState()
            .socketReducer as initialSocketReducerStateModel;
        return socketReducer.users;
    }

    addUser(payload: SocketUser) {
        const isUserPresent = this.getUsers().find(
            (item) => item.userId === payload.userId
        );
        if (!isUserPresent) {
            store.dispatch({
                type: 'ADD_USER',
                payload: { ...payload },
            });
        }
    }
}

export default SocketActions;
