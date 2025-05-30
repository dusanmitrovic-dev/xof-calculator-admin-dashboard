const mongoose = require('mongoose');

const GuildMemberSchema = mongoose.Schema({
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
    display_name: {
        type: String,
        required: true
    },
}, { collection: 'guild_members'});

module.exports = mongoose.model('GuildMember', GuildMemberSchema);