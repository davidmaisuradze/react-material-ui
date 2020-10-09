import S3 from 'aws-sdk/clients/s3';
import config from '../../config/aws';
import TryCatchErrorDecorator from '../../decorators/TryCatchErrorDecorator';
import ProfileModel from '../../models/Profile';
import NotificationModel from '../../models/Notification';
import AdminUserModel from '../../models/AdminUser';
import ClientError from '../../exeptions/ClientError';
import PasswordService from '../../services/PasswordService';
import ProfileStatuses from '../../constants/profile-status.constants';

class AdminProfileController {
    @TryCatchErrorDecorator
    static async getAdminRequests(req, res) {
        const admin = await AdminUserModel.findOne({_id: req.userId});
        if (!admin) {
            throw new ClientError('Admin not found', 404);
        }

        const adminRequests = await ProfileModel
            .find({'admins': admin.email})
            .sort({createdAt: -1});

        res.json(adminRequests);
    }

    @TryCatchErrorDecorator
    static async updateUserProfileStatus(req, res) {
        const {id, status, reason} = req.body;

        const admin = await AdminUserModel.findOne({_id: req.userId});
        if (!admin) {
            throw new ClientError('Admin not found', 404);
        }

        const profile = await ProfileModel.findOne({_id: id});
        if (!profile) {
            throw new ClientError('Profile request not found', 404);
        }

        await ProfileModel
            .findOneAndUpdate(
                {_id: id},
                {
                    $set: {
                        status,
                        rejectReason: reason
                    }
                },
                {upsert: true}
            );

        const notification = new NotificationModel({
            description: `admin ${admin.email} ${status === ProfileStatuses.APPROVED ? 'approved' : 'rejected'} your request`,
            userId: profile.userId,
            status,
            seen: false
        });
        await notification.save();

        const adminRequests = await ProfileModel
            .find({'admins': admin.email})
            .sort({createdAt: -1});

        res.json(adminRequests);
    }

    @TryCatchErrorDecorator
    static async changeAdminPassword(req, res) {
        const id = req.userId;
        const user = await AdminUserModel.findOne({_id: id});

        if (!user) {
            throw new ClientError('User invalid or expired', 400);
        }

        // const user = await UserModel.findOne({ _id: verifyData.id });
        const password = req.body.oldPassword;
        const checkPassword = await PasswordService.checkPassword(
            password,
            user.password
        );

        if (!checkPassword) {
            throw new ClientError('Wrong old Password', 401);
        }

        user.password = await PasswordService.hashPassword(req.body.newPassword);
        await user.save();

        res.json({status: 'success'});
    }

    @TryCatchErrorDecorator
    static async download(req, res) {
        const s3 = new S3({
            accessKeyId: config.awsAccessKey,
            secretAccessKey: config.awsSecretKey
        });
        console.log(req.query.location)
        const url = req.query.location;
        const urlArray = url.split('/');
        const key = `${urlArray[3]}/${urlArray[4]}`;

        const params = {
            Bucket: config.s3BucketName,
            Key: key
        };
        const object = await s3.getObject(params).promise();
        res.send(object.Body);
    }
}

export default AdminProfileController;
