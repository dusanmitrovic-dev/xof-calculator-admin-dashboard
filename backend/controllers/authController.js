const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Simple in-memory flag or check DB count for first user registration
let isFirstUser = true; // In production, check User.countDocuments() === 0 before starting server
User.countDocuments().then(count => {
    if (count > 0) {
        isFirstUser = false;
    }
}).catch(err => {
    console.error("Error checking user count:", err);
    // Handle potential startup error - maybe prevent registration?
});

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const userRole = isFirstUser ? 'admin' : 'user';
        // For subsequent users, managedGuilds would be assigned by an admin later.
        // For the first admin, managedGuilds is irrelevant as they have access to all.

        user = new User({
            email,
            password,
            role: userRole,
            managedGuilds: [] // Initialize as empty
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Prevent future registrations from automatically getting admin role
        if (isFirstUser) {
            isFirstUser = false;
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Sign JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Make sure JWT_SECRET is in your .env
            { expiresIn: '5h' }, // Token expiration (e.g., 5 hours)
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
                // Include managedGuilds if needed for frontend logic immediately after login
                // managedGuilds: user.managedGuilds 
            }
        };

        // Sign JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
};
