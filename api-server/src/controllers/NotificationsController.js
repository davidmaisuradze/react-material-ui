import NotificationModel from '../models/Notification';
import TryCatchErrorDecorator from '../decorators/TryCatchErrorDecorator';

class AdminNotificationsController {
    @TryCatchErrorDecorator
    static async getNotificationsList(req, res) {
        const notifications = await NotificationModel
            .find({'userId': req.userId})
            .sort({seen: -1})
            .select('_id description userId status seen');

        res.json(notifications);
    }

    @TryCatchErrorDecorator
    static async markNotificationAsSeen(req, res) {
        await NotificationModel
            .findOneAndUpdate(
                {_id: req.body.id},
                {
                    $set: {
                        seen: true
                    }
                },
                {upsert: true}
            );

        const notifications = await NotificationModel
            .find({'userId': req.userId})
            .sort({seen: -1})
            .select('_id description userId status seen');

        res.json(notifications);
    }
}

export default AdminNotificationsController;
