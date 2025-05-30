const GuildMember = require('../models/GuildMember');
const GuildRole = require('../models/GuildRole');

// Get all guild members for a given guild ID
exports.getGuildMembers = async (req, res) => {
    try {
        const members = await GuildMember.find({ guild_id: req.params.guildId });
        console.log("GuildID: " + req.params.guildId);
        console.log("Members:");
        console.log(members);
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all guild roles for a given guild ID
exports.getGuildRoles = async (req, res) => {
    try {
        const roles = await GuildRole.find({ guild_id: req.params.guildId });
        console.log("GuildID: " + req.params.guildId);
        console.log("Roles:");
        console.log(roles);
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};