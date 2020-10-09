import { Router } from 'express';
import AdminNotificationsController from '../controllers/AdminNotificationsController';
import Authorize from '../../middleware/Authorize';

const router = Router();

router.get('/admin/notifications/list', Authorize.check, AdminNotificationsController.getAdminNotificationsList);
router.put('/admin/notifications/change-status', Authorize.check, AdminNotificationsController.markAdminNotificationAsSeen);

export default router;
