const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'], // 'admin' for superuser, 'manager' for guild access
        default: 'manager'
    },
    managed_guild_ids: [{
        type: String // Store Guild IDs
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);