import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const NotificationSchema = new Schema(
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
        status: {
            type: String,
            required: true,
            trim: true
        },
        seen: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

mongoose.set('useCreateIndex', true);
NotificationSchema.plugin(uniqueValidator);

export default mongoose.model('notifications', NotificationSchema);
