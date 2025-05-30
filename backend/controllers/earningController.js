const Earnings = require('../models/Earnings');
const GuildConfig = require('../models/GuildConfig'); // May be needed for context

// Helper function to check if user can manage the guild associated with an earning
const checkEarningAuthorization = async (user, custom_id) => {
    console.log(`[AUTH_EARNING] Checking auth for user ${user.id} on earning ID ${custom_id}`);
    const earning = await Earnings.findOne({ id: custom_id });
    if (!earning) {
        console.log(`[AUTH_EARNING] Earning with ID ${custom_id} not found.`);
        return { authorized: false, status: 404, message: 'Earning not found' };
    }

    // --- REVERTED: Both earning.guild_id and user.managed_guild_ids should be strings now --- 
    const guildId = earning.guild_id;
    console.log(`[AUTH_EARNING] Earning ${custom_id} belongs to guild ${guildId}`);

    // Admin can manage any guild
    if (user.role === 'admin') {
        console.log(`[AUTH_EARNING] User ${user.id} is admin. Authorized.`);
        return { authorized: true, earning };
    }

    // Managers must have the guild_id in their managed_guild_ids array (String comparison)
    if (
        user.role === 'manager' &&
        user.managed_guild_ids && // <-- FIXED: use managed_guild_ids
        user.managed_guild_ids.includes(guildId)
    ) {
        console.log(`[AUTH_EARNING] User ${user.id} is manager for guild ${guildId}. Authorized.`);
        return { authorized: true, earning };
    }
    // --- END REVERT ---

    console.log(`[AUTH_EARNING] User ${user.id} (role: ${user.role}) is NOT authorized for guild ${guildId}.`);
    return { authorized: false, status: 403, message: 'Not authorized to manage this earning record' };
};

// @desc    Get all earnings for a specific guild
// @route   GET /api/earnings/:guild_id
// @access  Protected (Handled by canManageGuild middleware)
exports.getGuildEarnings = async (req, res) => {
    // --- REVERTED: Use guild_id directly as String --- 
    const targetGuildId = req.params.guild_id;
    console.log(`[GET_EARNINGS] Controller invoked for guild_id (string): ${targetGuildId}`);

    try {
        // Use the String guild_id in the query
        console.log(`[GET_EARNINGS] Attempting to query database: Earnings.find({ guild_id: ${targetGuildId} })`);
        const earnings = await Earnings.find({ guild_id: targetGuildId });
        // --- END REVERT ---

        console.log(`[GET_EARNINGS] Database query completed. Found ${earnings ? earnings.length : 'null'} earnings.`);

        if (!earnings) {
            console.warn(`[GET_EARNINGS] Warning: Earnings.find returned null/undefined for guild ${targetGuildId}`);
            return res.json([]);
        }

        console.log(`[GET_EARNINGS] Sending ${earnings.length} earnings records in response.`);
        res.json(earnings);
        console.log(`[GET_EARNINGS] Response sent successfully for guild_id: ${targetGuildId}`);

    } catch (err) {
        console.error(`[GET_EARNINGS] Error fetching earnings for guild ${targetGuildId}:`, err);
        res.status(500).send('Server Error while fetching earnings');
    }
};

// @desc    Create a new earning record
// @route   POST /api/earnings/:guild_id
// @access  Protected (Handled by canManageGuild middleware)
exports.createEarning = async (req, res) => {
    // --- REVERTED: Use guild_id directly as String --- 
    const guild_id = req.params.guild_id;
    console.log(`[CREATE_EARNING] Controller invoked for guild_id (string): ${guild_id}`);

    const { id, date, total_cut, gross_revenue, period, shift, role, models, hours_worked, user_mention } = req.body;

    console.log(`[CREATE_EARNING] Payload received (custom id): ${id}`);

    // Basic validation (using string guild_id)
    if (!id || !date || !guild_id || !user_mention) {
        console.log(`[CREATE_EARNING] Validation failed: Missing required fields.`);
        return res.status(400).json({ msg: 'Missing required fields (id, date, guild_id, user_mention)' });
    }

    try {
        console.log(`[CREATE_EARNING] Checking for existing earning with id ${id} in guild ${guild_id}`);
        // Use String for guild_id check
        const existingEarning = await Earnings.findOne({ id: id, guild_id: guild_id });
        // --- END REVERT ---
        if (existingEarning) {
            console.log(`[CREATE_EARNING] Custom ID ${id} already exists for guild ${guild_id}`);
            return res.status(400).json({ msg: 'Custom ID already exists for this guild' });
        }
        console.log(`[CREATE_EARNING] Custom ID ${id} is unique for guild ${guild_id}. Proceeding to save.`);

        const newEarning = new Earnings({
            id, // Custom ID from body
            guild_id: guild_id, // Save as String
            date,
            total_cut,
            gross_revenue,
            period,
            shift,
            role,
            models,
            hours_worked,
            user_mention
        });

        const earning = await newEarning.save();
        console.log(`[CREATE_EARNING] Earning saved successfully with _id: ${earning._id}`);
        res.status(201).json(earning);
    } catch (err) {
        console.error(`[CREATE_EARNING] Error saving earning for guild ${guild_id}:`, err);
        res.status(500).send('Server Error while creating earning');
    }
};

// @desc    Get a specific earning by its custom id
// @route   GET /api/earnings/entry/:custom_id
// @access  Protected (Authorization check needed)
exports.getEarningByCustomId = async (req, res) => {
    const custom_id = req.params.custom_id;
    console.log(`[GET_EARNING_BY_ID] Controller invoked for custom_id: ${custom_id}`);
    try {
        // checkEarningAuthorization already handles fetching and checks
        const authCheck = await checkEarningAuthorization(req.user, custom_id);
        if (!authCheck.authorized) {
            console.log(`[GET_EARNING_BY_ID] Authorization failed for user ${req.user.id} on earning ${custom_id}: ${authCheck.message}`);
            return res.status(authCheck.status).json({ msg: authCheck.message });
        }
        console.log(`[GET_EARNING_BY_ID] Authorization successful. Sending earning data.`);
        res.json(authCheck.earning);
    } catch (err) {
        console.error(`[GET_EARNING_BY_ID] Error fetching earning ${custom_id}:`, err);
        res.status(500).send('Server Error while fetching earning by custom ID');
    }
};

// @desc    Update a specific earning by its custom id
// @route   PUT /api/earnings/entry/:custom_id
// @access  Protected (Authorization check needed)
exports.updateEarningByCustomId = async (req, res) => {
    const custom_id = req.params.custom_id;
    console.log(`[UPDATE_EARNING_BY_ID] Controller invoked for custom_id: ${custom_id}`);
    try {
        const authCheck = await checkEarningAuthorization(req.user, custom_id);
        if (!authCheck.authorized) {
            console.log(`[UPDATE_EARNING_BY_ID] Authorization failed for user ${req.user.id} on earning ${custom_id}: ${authCheck.message}`);
            return res.status(authCheck.status).json({ msg: authCheck.message });
        }
        console.log(`[UPDATE_EARNING_BY_ID] Authorization successful. Attempting update.`);

        // Ensure guild_id is not updated from req.body if present
        const updatePayload = { ...req.body };
        delete updatePayload.guild_id;
        delete updatePayload.id; // Should not update the custom id either

        const earning = await Earnings.findOneAndUpdate(
            { id: custom_id }, // Find by custom string ID
            { $set: updatePayload },
            { new: true } // Return the updated document
        );

        if (!earning) {
            console.log(`[UPDATE_EARNING_BY_ID] Earning with custom ID ${custom_id} not found for update.`);
            return res.status(404).json({ msg: 'Earning not found with this custom ID' });
        }
        console.log(`[UPDATE_EARNING_BY_ID] Earning ${custom_id} updated successfully.`);
        res.json(earning);
    } catch (err) {
        console.error(`[UPDATE_EARNING_BY_ID] Error updating earning ${custom_id}:`, err);
        res.status(500).send('Server Error while updating earning');
    }
};

// @desc    Delete a specific earning by its custom id
// @route   DELETE /api/earnings/entry/:custom_id
// @access  Protected (Authorization check needed)
exports.deleteEarningByCustomId = async (req, res) => {
    const custom_id = req.params.custom_id;
    console.log(`[DELETE_EARNING_BY_ID] Controller invoked for custom_id: ${custom_id}`);
    try {
        const authCheck = await checkEarningAuthorization(req.user, custom_id);
        if (!authCheck.authorized) {
            console.log(`[DELETE_EARNING_BY_ID] Authorization failed for user ${req.user.id} on earning ${custom_id}: ${authCheck.message}`);
            return res.status(authCheck.status).json({ msg: authCheck.message });
        }
        console.log(`[DELETE_EARNING_BY_ID] Authorization successful. Attempting delete.`);

        const earning = await Earnings.findOneAndDelete({ id: custom_id }); // Find by custom string ID

        if (!earning) {
            console.log(`[DELETE_EARNING_BY_ID] Earning with custom ID ${custom_id} not found for deletion.`);
            return res.status(404).json({ msg: 'Earning not found with this custom ID' });
        }
        console.log(`[DELETE_EARNING_BY_ID] Earning ${custom_id} deleted successfully.`);
        res.json({ msg: 'Earning removed' });
    } catch (err) {
        console.error(`[DELETE_EARNING_BY_ID] Error deleting earning ${custom_id}:`, err);
        res.status(500).send('Server Error while deleting earning');
    }
};
