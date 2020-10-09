import AdminUserModel from '../../models/AdminUser';
import TryCatchErrorDecorator from '../../decorators/TryCatchErrorDecorator';

class AdminUsersController {
    @TryCatchErrorDecorator
    static async getAdmins(req, res) {
        const users = await AdminUserModel.find().select('_id name email');

        res.json(users);
    }
}

export default AdminUsersController;
