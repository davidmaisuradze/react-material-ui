import { Router } from 'express';
import UsersController from '../controllers/AdminUsersController';
import Authorize from '../../middleware/Authorize';

const router = Router();

router.get('/admin/users', Authorize.check, UsersController.getAdmins);

export default router;
