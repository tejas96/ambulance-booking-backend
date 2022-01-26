import { Router } from 'express';
import { UserController } from '../controller';

const routes = Router();

routes.get('/register', UserController.registerUser);

export default routes;
