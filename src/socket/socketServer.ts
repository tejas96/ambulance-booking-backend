import { Express } from 'express';
import { userIdListenerPayload, UserRole } from '../model';
import { SocketUser } from '../model/redux';
import SocketActions from '../services/SocketActions';
const http = require('http');
const socketIO = require('socket.io');

const socketActionsService = new SocketActions();

class SocketServer {
    public io: any;
    public port: number;
    public server: any;
    constructor() {
        this.port = 12345;
    }
    createServer(app: Express, port: number) {
        const server = http.createServer(app);
        const io = socketIO(server);
        // const io =
        // const io = new Server(port, {
        //     cors: {
        //         origin: '*',
        //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //     },
        // });
        this.server = server;
        this.port = port;
        this.io = io;
        return { io };
    }
    start() {
        this.server.listen(this.port);
        console.log(`Socket server is running on port ${this.port}`);
        this.eventsStart();
    }

    private eventsStart() {
        this.io.on('connection', (socket: any) => {
            socket.on('disconnect', () => {
                console.log('user disconnected');
                socket.broadcast.emit('user disconnected');
            });

            //join room
            socket.on('room', (payload: SocketUser) => {
                if (payload.userRole === UserRole.DRIVER)
                    socketActionsService.addUser(payload);
                else socketActionsService.addPassenger(payload);
                socket.join(payload.room);
                this.io
                    .to(payload.room)
                    .emit(
                        'users',
                        socketActionsService.getUsers(UserRole.DRIVER)
                    );
            });

            socket.on('request', (payload: any) => {
                const driver: SocketUser | null =
                    socketActionsService.findNearestDriver(payload);
                if (driver) {
                    this.io
                        .to(driver.room)
                        .emit(driver.userId, { type: 'booking', payload });
                }
            });

            socket.on('deleteUser', (payload: any) => {
                socketActionsService.deleteUser(payload);
            });

            socket.on('sharing', (payload: userIdListenerPayload) => {
                switch (payload.type) {
                    case 'bookingRequestStatus':
                        this.io.to(payload.room).emit(payload.userId, payload);
                        break;
                    case 'tracking':
                        this.io.to(payload.room).emit(payload.userId, payload);
                        break;
                    default:
                        break;
                }
            });
        });
    }
}

export default SocketServer;
