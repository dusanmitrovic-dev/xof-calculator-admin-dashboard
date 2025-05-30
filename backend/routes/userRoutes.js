const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Restore middleware imports
const { protect, adminOnly, adminOrManager } = require('../middleware/authMiddleware');

console.log('[DEBUG] Loading userRoutes.js...'); // Keep debug log for now

// Apply middleware directly to each route

// @route   GET /api/users
// @desc    Get all users
// @access  Admin Only
router.get('/', protect, adminOrManager, userController.getUsers);

// @route   GET /api/users/managed-guilds/available
// @desc    Get list of unique guild IDs from configs
// @access  Admin Only
router.get('/managed-guilds/available', protect, adminOrManager, userController.getAvailableGuilds);

// @route   GET /api/users/:user_id
// @desc    Get user by ID
// @access  Admin Only
router.get('/:user_id', protect, adminOrManager, userController.getUserById);

// @route   PUT /api/users/:user_id
// @desc    Update user role or managed guilds
// @access  Admin Only
router.put('/:user_id', protect, adminOrManager, userController.updateUser);

// @route   DELETE /api/users/:user_id
// @desc    Delete user
// @access  Admin Only
router.delete('/:user_id', protect, adminOrManager, userController.deleteUser);

console.log('[DEBUG] Exporting router from userRoutes.js...'); // Keep debug log for now
module.exports = router;
