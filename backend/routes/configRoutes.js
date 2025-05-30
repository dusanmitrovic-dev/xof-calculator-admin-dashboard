const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');
// Restore middleware import
const { protect, adminOnly, canManageGuild } = require('../middleware/authMiddleware');

console.log('[DEBUG] Loading configRoutes.js...');
console.log('[DEBUG] Middleware imported in configRoutes.js');

// @route   GET /api/config
// @desc    Get all available guild configs (id and name only)
// @access  Protected (Logged-in users)
// *** Added this route ***
router.get('/', protect, configController.getAllGuildConfigs);

// @route   POST /api/config/:guild_id
// @desc    Create or Update config for a specific guild
// @access  Protected (Admin or Manager for this Guild)
router.post('/:guild_id', protect, canManageGuild, configController.createOrUpdateGuildConfig);

// @route   GET /api/config/:guild_id
// @desc    Get config for a specific guild
// @access  Protected (Admin or Manager for this Guild)
router.get('/:guild_id', protect, canManageGuild, configController.getGuildConfig);

// @route   DELETE /api/config/:guild_id
// @desc    Delete config for a specific guild
// @access  Protected (Admin only)
router.delete('/:guild_id', protect, adminOnly, configController.deleteGuildConfig);

// @route   GET /api/config/:guild_id/:field
// @desc    Get a specific field from a guild's config
// @access  Protected (Admin or Manager for this Guild)
router.get('/:guild_id/:field', protect, canManageGuild, configController.getGuildConfigField);

// @route   PUT /api/config/:guild_id/:field
// @desc    Update a specific field in a guild's config
// @access  Protected (Admin or Manager for this Guild)
router.put('/:guild_id/:field', protect, canManageGuild, configController.updateGuildConfigField);

console.log('[DEBUG] Exporting router from configRoutes.js...');
module.exports = router;
