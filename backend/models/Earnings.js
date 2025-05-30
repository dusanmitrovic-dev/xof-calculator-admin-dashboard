const mongoose = require('mongoose');

const EarningsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Assuming this is a unique identifier you generate
  // --- CHANGE: Store guild_id as String --- 
  guild_id: { type: String, required: true, index: true },
  // --- END CHANGE ---
  date: { type: String, required: true }, // Consider using Date type if format is consistent
  total_cut: { type: Number, required: true },
  gross_revenue: { type: Number, required: true },
  period: { type: String, required: true },
  shift: { type: String, required: true },
  role: { type: String, required: true }, // Consider referencing Role ID if you have a Roles collection
  models: { type: [String], required: true }, // Changed to array of strings
  hours_worked: { type: Number, required: true },
  user_mention: { type: String, required: true } // Or potentially a User ID reference
}, { collection: 'earnings'});

module.exports = mongoose.model('Earnings', EarningsSchema);
