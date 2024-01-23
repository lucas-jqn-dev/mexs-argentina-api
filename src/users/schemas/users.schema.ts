import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    clientId: {
        type: String,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

 