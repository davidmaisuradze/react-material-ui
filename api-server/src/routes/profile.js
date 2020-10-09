import { Router } from 'express';
import fileUpload from 'express-fileupload';
import ProfileController from '../controllers/ProfileController';
import Authorize from '../middleware/Authorize';

const router = Router();

router.post('/upload', Authorize.check, fileUpload({
    limits: {fileSize: 2 * 1024 * 1024},
}), ProfileController.saveProfile);
router.get('/history', Authorize.check, ProfileController.findHistory);
router.post('/changePassword', Authorize.check, ProfileController.changePassword);
router.get('/download', ProfileController.download);


export default router;
