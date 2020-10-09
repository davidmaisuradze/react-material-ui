import { Router } from 'express';
import NotificationsController from '../controllers/NotificationsController';
import Authorize from '../middleware/Authorize';

const router = Router();

router.get('/notifications/list', Authorize.check, NotificationsController.getNotificationsList);
router.put('/notifications/change-status', Authorize.check, NotificationsController.markNotificationAsSeen);

export default router;
