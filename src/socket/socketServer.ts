import { Server } from 'socket.io';
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
            socketActionsService.addUser(socket.handshake.query);
            socket.on('disconnect', () => {
                console.log('user disconnected');
                socket.broadcast.emit('user disconnected');
            });

            //join room
            socket.on('room', (payload: any) => {
                socketActionsService.addUser(payload);
                socket.join(payload.room);
                this.io
                    .to(payload.room)
                    .emit('users', socketActionsService.getUsers());
            });
        });
    }
}

export default SocketServer;
