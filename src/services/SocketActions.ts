import { UserRole } from '../model';
import { SocketUser } from '../model/redux';
import { initialSocketReducerStateModel } from '../redux/reducers/socketReducer';
import { store } from '../redux/store';

class SocketActions {
    getUsers(type: UserRole) {
        const socketReducer = store.getState()
            .socketReducer as initialSocketReducerStateModel;
        if (type === UserRole.DRIVER) return socketReducer.drivers;
        else return socketReducer.passengers;
    }

    addUser(payload: SocketUser) {
        let data = this.getUsers(UserRole.DRIVER);
        const isDriverPresent = data.find(
            (item) => item.userId === payload.userId
        );

        if (isDriverPresent) {
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
            type: 'ADD_DRIVERS',
            payload: data,
        });
    }
    addPassenger(payload: SocketUser) {
        let data = this.getUsers(UserRole.PASSENGER);
        const isPassengerPresent = data.find(
            (item) => item.userId === payload.userId
        );
        if (isPassengerPresent) {
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
            type: 'ADD_PASSENGERS',
            payload: data,
        });
    }
    findNearestDriver(payload: any) {
        let data = this.getUsers(UserRole.DRIVER);
        const { latitude, longitude } = payload.bookingLocation;
        const map = {} as any;
        let min = Number.MAX_SAFE_INTEGER;
        data.forEach((item) => {
            const d = this.distance(
                item.lat,
                item.long,
                latitude,
                longitude,
                'K'
            );
            if (min > d) {
                min = d;
            }
            map[d] = item;
        });
        return map[min];
    }

    deleteUser(payload: any) {
        let data = this.getUsers(payload.userRole);
        data = data.filter((item) => item.userId !== payload.userId);
        if (payload.userRole === UserRole.DRIVER) {
            store.dispatch({
                type: 'DELETE_DRIVER',
                payload: data,
            });
        } else {
            store.dispatch({
                type: 'DELETE_PASSENGER',
                payload: data,
            });
        }
    }
    distance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
        unit: string
    ) {
        let radlat1 = (Math.PI * lat1) / 180;
        let radlat2 = (Math.PI * lat2) / 180;
        let theta = lon1 - lon2;
        let radtheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
            dist = dist * 1.609344;
        }
        if (unit == 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    }
}

export default SocketActions;
