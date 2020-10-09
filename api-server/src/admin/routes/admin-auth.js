import { Router } from 'express';
import AdminAuthController from '../controllers/AdminAuthController';
import Validate from '../../middleware/Validate';
import Authorize from '../../middleware/Authorize';
import adminAuthSchemas from '../schemas/admin-auth';

const router = Router();

router.post(
    '/admin/auth/signin',
    Validate.prepare(adminAuthSchemas.signin),
    AdminAuthController.signin
);
router.post(
    '/admin/auth/signup',
    Validate.prepare(adminAuthSchemas.signup),
    AdminAuthController.signup
);
router.put(
    '/admin/auth/set-password',
    Validate.prepare(adminAuthSchemas.setPassword),
    AdminAuthController.setPassword
);
router.post(
    '/admin/auth/check-password-token-validity',
    Validate.prepare(adminAuthSchemas.checkPasswordTokenValidity),
    AdminAuthController.checkPasswordTokenValidity
);
router.put(
    '/admin/auth/renew-password-token',
    Validate.prepare(adminAuthSchemas.renewPasswordToken),
    AdminAuthController.renewPasswordToken
)
router.post(
    '/admin/auth/refresh-tokens',
    Validate.prepare(adminAuthSchemas.refreshTokens),
    AdminAuthController.refreshTokens
);
router.post('/admin/auth/logout', Authorize.check, AdminAuthController.logout);
router.post(
    '/admin/auth/restore-password',
    Validate.prepare(adminAuthSchemas.restorePassword),
    AdminAuthController.restorePassword
);
router.post(
    '/admin/auth/confirm-restore-password',
    Validate.prepare(adminAuthSchemas.confirmRestorePassword),
    AdminAuthController.confirmRestorePassword
);
router.post(
    '/admin/auth/verify-restore-password-token',
    Validate.prepare(adminAuthSchemas.verifyRestorePasswordToken),
    AdminAuthController.verifyRestorePasswordToken,
)

export default router;
