const express = require('express');
const router = express.Router();
const earningController = require('../controllers/earningController');
const { protect, adminOnly, canManageGuild, canManageEarning } = require('../middleware/authMiddleware');

// @route   GET /api/earnings/:guild_id
// @desc    List all earnings for a specific guild
// @access  Protected (Admin or Manager for this Guild)
router.get('/:guild_id', protect, canManageGuild, earningController.getGuildEarnings);

// @route   POST /api/earnings/:guild_id
// @desc    Create a new earning record for a specific guild
// @access  Protected (Admin or Manager for this Guild)
router.post('/:guild_id', protect, canManageGuild, earningController.createEarning); // Requires custom id in body

// @route   GET /api/earnings/entry/:custom_id
// @desc    Get a specific earning by its custom id
// @access  Protected (Needs check within controller if user can access this earning's guild)
router.get('/entry/:custom_id', protect, earningController.getEarningByCustomId); // Authorization check inside controller needed

// @route   PUT /api/earnings/entry/:custom_id
// @desc    Update a specific earning by its custom id
// @access  Protected (Needs check within controller if user can access this earning's guild)
router.put('/entry/:custom_id', protect, canManageEarning, earningController.updateEarningByCustomId); // Authorization check inside controller needed

// @route   DELETE /api/earnings/entry/:custom_id
// @desc    Delete a specific earning by its custom id
// @access  Protected (Needs check within controller if user can access this earning's guild)
router.delete('/entry/:custom_id', protect, canManageEarning, earningController.deleteEarningByCustomId); // Authorization check inside controller needed

// Removed GET /api/earnings (List all) - Requires decision/implementation for admin.

module.exports = router;
