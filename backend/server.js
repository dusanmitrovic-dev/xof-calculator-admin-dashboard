require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false })); // Allows us to accept JSON data in body
const allowedOrigins = process.env.FRONTEND_ORIGINS
  ? process.env.FRONTEND_ORIGINS.split(",")
  : [];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // if you use cookies or authentication headers
//   })
// );
app.use(cors());

// Serve static files from Angular dist folder
app.use(express.static(path.join(__dirname, "../dist/xof-calculator-admin-dashboard/browser")));

// Define Routes
app.get("/", (req, res) => res.send("API Running")); // Simple check
const authRoutes = require("./routes/authRoutes");
const configRoutes = require("./routes/configRoutes");
const earningRoutes = require("./routes/earningRoutes");
const userRoutes = require("./routes/userRoutes"); // Mount user routes
const guildRoutes = require("./routes/guildRoutes"); // Mount guild routes

// API routes (keep these above the catch-all)
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);
app.use("/api/earnings", earningRoutes);
app.use("/api/users", userRoutes);
app.use("/api/guilds", guildRoutes); // Use guild routes

// Catch-all: send index.html for any other route (for Angular routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/xof-calculator-admin-dashboard/browser/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
