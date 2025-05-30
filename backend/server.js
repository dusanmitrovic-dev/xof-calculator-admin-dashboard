require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false })); // Allows us to accept JSON data in body
const allowedOrigins = process.env.FRONTEND_ORIGINS ? process.env.FRONTEND_ORIGINS.split(',') : [];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // if you use cookies or authentication headers
//   })
// );
app.use(cors());

// Define Routes
app.get('/', (req, res) => res.send('API Running')); // Simple check
const authRoutes = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');
const earningRoutes = require('./routes/earningRoutes');
const userRoutes = require('./routes/userRoutes'); // Mount user routes
const guildRoutes = require('./routes/guildRoutes'); // Mount guild routes

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/earnings', earningRoutes);
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/guilds', guildRoutes); // Use guild routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
