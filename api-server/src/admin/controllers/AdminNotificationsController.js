import AdminNotificationModel from '../../models/AdminNotification';
import TryCatchErrorDecorator from '../../decorators/TryCatchErrorDecorator';
import AdminUserModel from '../../models/AdminUser';
import ClientError from '../../exeptions/ClientError';

class AdminNotificationsController {
    @TryCatchErrorDecorator
    static async getAdminNotificationsList(req, res) {
        const admin = await AdminUserModel.findOne({_id: req.userId});
        if (!admin) {
            throw new ClientError('Admin not found', 404);
        }

        const adminNotifications = await AdminNotificationModel
            .find({'adminEmails': admin.email})
            .sort({seen: -1})
            .select('_id description userId userName seen');

        res.json(adminNotifications);
    }

    @TryCatchErrorDecorator
    static async markAdminNotificationAsSeen(req, res) {
        await AdminNotificationModel
            .findOneAndUpdate(
                {_id: req.body.id},
                {
                    $set: {
                        seen: true
                    }
                },
                {upsert: true}
            );

        const admin = await AdminUserModel.findOne({_id: req.userId});
        if (!admin) {
            throw new ClientError('Admin not found', 404);
        }

        const adminNotifications = await AdminNotificationModel
            .find({'adminEmails': admin.email})
            .sort({seen: -1})
            .select('_id description userId userName seen');

        res.json(adminNotifications);
    }
}

export default AdminNotificationsController;
