import { Server } from 'socket.io';

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
            console.log('a user connected :D', socket.handshake.query.userId);
            socket.on('chat', (msg: any) => {
                console.log(msg);
                this.io.emit('chat message', msg);
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
                socket.broadcast.emit('user disconnected');
            });
            socket.on('Sangli', () => {
                console.log('Sangli');
                socket.broadcast.emit('Sangli');
            });
            socket.on('Kolhapur', () => {
                socket.broadcast.emit('Kolhapur');
            });
        });
    }
}

export default SocketServer;
