import mongoose from 'mongoose';
import { UserRoles } from '../constants/user-roles.constant.js';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: 'customer'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;