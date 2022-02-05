import { Router } from 'express';
import { UserController } from '../controller';
// import { authMiddleware } from '../middleware';
const routes = Router();

routes.get('/getUser', UserController.getUser);
routes.post('/register', UserController.registerUser);
export default routes;
