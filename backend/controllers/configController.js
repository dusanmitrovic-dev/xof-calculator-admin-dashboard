const GuildConfig = require('../models/GuildConfig');

// Helper function to handle errors
const handleError = (res, error, message = 'Server error', statusCode = 500) => {
    console.error(`${message}:`, error.message);
    res.status(statusCode).send(message);
};

// @desc    Get all guild configs (simplified for dropdown)
// @route   GET /api/config
// @access  Protected
exports.getAllGuildConfigs = async (req, res) => {
    console.log('[DEBUG] Entering configController.getAllGuildConfigs');
    try {
        const configs = await GuildConfig.find({}).lean(); // Fetch full documents
        console.log(`[DEBUG] Found ${configs.length} configs in DB.`);

        // Map to the desired {id, name} structure HERE
        const availableGuilds = configs.map(config => ({
            id: config.guild_id, // Map from guild_id
            name: config.display_settings?.agency_name || config.guild_id // Map from display_settings or fallback
        }));

        console.log('[DEBUG] Sending availableGuilds:', availableGuilds); // Log the mapped structure
        res.json(availableGuilds); // Send the mapped structure
    } catch (err) {
        handleError(res, err, 'Error getting all guild configs');
    }
};

// @desc    Create or Update config for a specific guild
// @route   POST /api/config/:guild_id
// @access  Protected (Admin or Manager for this Guild)
exports.createOrUpdateGuildConfig = async (req, res) => {
    console.log(`[DEBUG] Entering createOrUpdateGuildConfig for guild: ${req.params.guild_id}`);
    const { guild_id } = req.params;
    const configData = req.body;

    // Basic validation
    if (!guild_id || typeof configData !== 'object') {
        return res.status(400).json({ msg: 'Invalid request data' });
    }

    // Ensure guild_id from param matches body if present, or add it
    configData.guild_id = guild_id;

    try {
        // Use findOneAndUpdate with upsert: true to create or update
        const options = { 
            new: true,          // Return the modified document rather than the original
            upsert: true,       // Create a new doc if no match is found
            runValidators: true // Ensure schema validation runs on update
        };
        
        const updatedConfig = await GuildConfig.findOneAndUpdate({ guild_id: guild_id }, configData, options);
        
        if (!updatedConfig) {
            // Should not happen with upsert: true, but handle defensively
            return res.status(404).json({ msg: 'Config could not be created or updated' });
        }

        console.log(`[DEBUG] Successfully created/updated config for guild: ${guild_id}`);
        res.json(updatedConfig);

    } catch (err) {
        handleError(res, err, `Error creating/updating config for guild ${guild_id}`);
    }
};

// @desc    Get config for a specific guild
// @route   GET /api/config/:guild_id
// @access  Protected (Admin or Manager for this Guild)
exports.getGuildConfig = async (req, res) => {
    console.log(`[DEBUG] Entering getGuildConfig for guild: ${req.params.guild_id}`);
    try {
        const config = await GuildConfig.findOne({ guild_id: req.params.guild_id }).lean();
        if (!config) {
            console.log(`[DEBUG] Config not found for guild: ${req.params.guild_id}`);
            return res.status(404).json({ msg: 'Config not found' });
        }
        console.log(`[DEBUG] Found config for guild: ${req.params.guild_id}`);
        res.json(config);
    } catch (err) {
        handleError(res, err, `Error getting config for guild ${req.params.guild_id}`);
    }
};

// @desc    Delete config for a specific guild
// @route   DELETE /api/config/:guild_id
// @access  Protected (Admin only)
exports.deleteGuildConfig = async (req, res) => {
    console.log(`[DEBUG] Entering deleteGuildConfig for guild: ${req.params.guild_id}`);
    try {
        const result = await GuildConfig.findOneAndDelete({ guild_id: req.params.guild_id });
        if (!result) {
            console.log(`[DEBUG] Config not found for deletion: ${req.params.guild_id}`);
            return res.status(404).json({ msg: 'Config not found' });
        }
        console.log(`[DEBUG] Successfully deleted config for guild: ${req.params.guild_id}`);
        res.json({ msg: 'Config deleted successfully' });
    } catch (err) {
        handleError(res, err, `Error deleting config for guild ${req.params.guild_id}`);
    }
};

// @desc    Get a specific field from a guild's config
// @route   GET /api/config/:guild_id/:field
// @access  Protected (Admin or Manager for this Guild)
exports.getGuildConfigField = async (req, res) => {
    const { guild_id, field } = req.params;
    console.log(`[DEBUG] Entering getGuildConfigField for guild: ${guild_id}, field: ${field}`);
    try {
        // Validate field name if necessary (prevent projecting sensitive fields)
        // Example: const allowedFields = ['models', 'shifts', 'periods', ...];
        //          if (!allowedFields.includes(field)) return res.status(400).json({ msg: 'Invalid field' });
        
        const config = await GuildConfig.findOne({ guild_id: guild_id }, field).lean(); // Select only the requested field
        if (!config || config[field] === undefined) {
             console.log(`[DEBUG] Config or field '${field}' not found for guild: ${guild_id}`);
            return res.status(404).json({ msg: `Field '${field}' not found for this config` });
        }
        console.log(`[DEBUG] Found field '${field}' for guild: ${guild_id}`);
        res.json({ [field]: config[field] });
    } catch (err) {
        handleError(res, err, `Error getting field '${field}' for guild ${guild_id}`);
    }
};

// @desc    Update a specific field in a guild's config
// @route   PUT /api/config/:guild_id/:field
// @access  Protected (Admin or Manager for this Guild)
exports.updateGuildConfigField = async (req, res) => {
    const { guild_id, field } = req.params;
    const { value } = req.body; // Assuming the value comes in the request body like { value: ... }
    console.log(`[DEBUG] Entering updateGuildConfigField for guild: ${guild_id}, field: ${field}`);

    if (value === undefined) {
        return res.status(400).json({ msg: 'Missing field value in request body' });
    }

    try {
        const update = { $set: { [field]: value } };
        const options = { new: true, runValidators: true }; // Return updated doc, run validators
        
        const updatedConfig = await GuildConfig.findOneAndUpdate({ guild_id: guild_id }, update, options);
        
        if (!updatedConfig) {
            console.log(`[DEBUG] Config not found for field update: ${guild_id}`);
            return res.status(404).json({ msg: 'Config not found' });
        }
        console.log(`[DEBUG] Successfully updated field '${field}' for guild: ${guild_id}`);
        res.json(updatedConfig);

    } catch (err) {
        handleError(res, err, `Error updating field '${field}' for guild ${guild_id}`);
    }
};
