const mongoose = require('mongoose');

const GuildRoleSchema = mongoose.Schema({
    guild_id: {
        type: String,
        required: true
    },
    id: {
        type: Object, // Changed to Object to match the data structure
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { collection: 'guild_roles'});

module.exports = mongoose.model('GuildRole', GuildRoleSchema);