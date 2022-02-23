import { Router } from 'express';
import { UserController } from '../controller';
import { authMiddleware } from '../middleware';
const routes = Router();

routes.get('/getDrivers', authMiddleware, UserController.getUser);
routes.post('/register', authMiddleware, UserController.registerUser);

export default routes;
