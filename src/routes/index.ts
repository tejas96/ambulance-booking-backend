import userRoutes from './user.routes';
import driverRoutes from './driver.routes';
import express from 'express';
import hospitalRoutes from './hospital.routes';
// import { errorMiddleware } from '../middleware';

const app = express();

export const initRoutes = () => {
    app.use('/api/v1/user', userRoutes);
    app.use('/api/v1/driver', driverRoutes);
    app.use('/api/v1/hospital', hospitalRoutes);
    app.get('/ping', (_, res) => {
        res.status(200).send('pong');
    });
    // app.use(errorMiddleware);
};

export default app;
