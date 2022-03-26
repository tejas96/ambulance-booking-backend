import { Server } from 'socket.io';
import { UserRole } from '../model';
import { SocketUser } from '../model/redux';
import SocketActions from '../services/SocketActions';

const socketActionsService = new SocketActions();

class SocketServer {
    public io: any;
    public port: number;
    constructor() {
        this.port = 12345;
    }
    createServer(port: number) {
        const io = new Server(port, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            },
        });
        this.port = port;
        this.io = io;
        return { io };
    }
    start() {
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
                socket.join(payload.room);
                this.io
                    .to(payload.room)
                    .emit('users', socketActionsService.getUsers());
            });

            socket.on('bookAmbulance', (payload: any) => {
                socket.emit('HdLAPeVGm0eTLpuZ7pEAWlJNwiw1', payload);
            });
        });
    }
}

export default SocketServer;
