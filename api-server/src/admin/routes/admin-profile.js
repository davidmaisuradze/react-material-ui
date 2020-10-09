import { Router } from 'express';
import AdminProfileController from '../controllers/AdminProfileController';
import Authorize from '../../middleware/Authorize';

const router = Router();

router.get('/admin/user-profile/requests', Authorize.check, AdminProfileController.getAdminRequests);
router.put('/admin/user-profile/update-status', Authorize.check, AdminProfileController.updateUserProfileStatus);
router.post('/admin/user-profile/changePassword', Authorize.check, AdminProfileController.changeAdminPassword);
router.get('/admin/user-profile/download', AdminProfileController.download);


export default router;
