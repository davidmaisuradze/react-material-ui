import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const AdminNotificationSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: String,
            required: true,
            trim: true
        },
        userName: {
            type: String,
            required: true,
            trim: true
        },
        seen: {
            type: Boolean,
            required: true
        },
        adminEmails: [{
            type: String,
            required: true,
            trim: true
        }],
    },
    {
        timestamps: true
    }
);

mongoose.set('useCreateIndex', true);
AdminNotificationSchema.plugin(uniqueValidator);

export default mongoose.model('admin_notifications', AdminNotificationSchema);
