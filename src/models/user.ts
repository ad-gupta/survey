import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    image: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    googleId: {type: String, default: ""}
})

export const User = mongoose.models?.User || mongoose.model('User', schema)