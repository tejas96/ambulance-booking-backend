import userRoutes from './user.routes';
import express from 'express';

const app = express();

export const initRoutes = () => {
    app.use('/api/v1/user', userRoutes);
    app.get('/ping', (_, res) => {
        res.status(200).send('pong');
    });
};

export default app;
