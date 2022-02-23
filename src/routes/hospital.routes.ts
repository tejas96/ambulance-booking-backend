import { Router } from 'express';
import { authMiddleware } from '../middleware';
import { HospitalController } from '../controller';
const router = Router();

router.post('/register', authMiddleware, HospitalController.registerHospital);
router.get('/', authMiddleware, HospitalController.getHospitalsByCityName);
export default router;
