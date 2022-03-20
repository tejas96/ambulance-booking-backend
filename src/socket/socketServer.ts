import { Express } from 'express';

class SocketServer {
    private app: Express;
    public server: any;
    public io: any;
    public port: number;
    constructor(app: Express) {
        this.app = app;
        this.port = 12345;
    }
    createServer(port: number) {
        const server = require('http').createServer(this.app);
        const io = require('socket.io')(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            },
        });
        this.port = port;
        this.server = server;
        this.io = io;
        return { server, io };
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Socket server is running on port ${this.port}`);
            this.eventsStart();
        });
    }

    private eventsStart() {
        this.io.on('connection', (socket: any) => {
            console.log('a user connected :D', socket.handshake.query.token);
            socket.on('chat', (msg: any) => {
                console.log(msg);
                this.io.emit('chat message', msg);
            });
        });
    }
}

export default SocketServer;
