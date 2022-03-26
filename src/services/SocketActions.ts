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
        let data = this.getUsers();
        const isPresent = data.find((item) => item.userId === payload.userId);

        if (isPresent) {
            data = data.map((item) => {
                if (item.userId === payload.userId) {
                    return payload;
                }
                return item;
            });
        } else {
            let clone = JSON.parse(JSON.stringify(data));
            clone.push(payload);
            data = clone;
        }

        store.dispatch({
            type: 'ADD_USER',
            payload: data,
        });
    }
}

export default SocketActions;
