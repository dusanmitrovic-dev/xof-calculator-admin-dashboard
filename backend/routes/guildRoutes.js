const express = require('express');
const router = express.Router();
const guildController = require('../controllers/guildController');

// Get all guild members for a given guild ID
router.get('/members/:guildId', guildController.getGuildMembers);

// Get all guild roles for a given guild ID
router.get('/roles/:guildId', guildController.getGuildRoles);

module.exports = router;