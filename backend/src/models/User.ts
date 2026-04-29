import mongoose, { Schema, Types } from 'mongoose';

interface User {
    email: string;
    password: string;
    displayName: string;
    avatar: string | null;
    role: 'user' | 'admin';
    token: string;
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
