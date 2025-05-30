const mongoose = require('mongoose');

const BonusRuleSchema = new mongoose.Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  amount: { type: Number, required: true }
}, { _id: false });

const DisplaySettingsSchema = new mongoose.Schema({
  ephemeral_responses: { type: Boolean, default: false },
  show_average: { type: Boolean, default: true },
  agency_name: { type: String, default: 'Agency' },
  show_ids: { type: Boolean, default: true },
  bot_name: { type: String, default: 'Shift Calculator' },
  logo_image_base64: { type: String, default: '' }, // base64-encoded image for logo
  logo_text: { type: String, default: '' },  
}, { _id: false });

const CommissionRoleSchema = new mongoose.Schema({
  commission_percentage: Number,
  hourly_rate: Number
}, { _id: false });

const CommissionUserSchema = new mongoose.Schema({
  hourly_rate: Number,
  commission_percentage: Number, // <-- Add this line
  override_role: Boolean
}, { _id: false });

const CommissionSettingsSchema = new mongoose.Schema({
  roles: { type: Map, of: CommissionRoleSchema }, // Role ID -> Commission %
  users: { type: Map, of: CommissionUserSchema }  // User ID -> Hourly Rate/Override/Commission %
}, { _id: false });

const GuildConfigSchema = new mongoose.Schema({
  guild_id: { type: String, required: true, unique: true, index: true },
  models: { type: [String], default: [] },
  shifts: { type: [String], default: [] },
  periods: { type: [String], default: [] },
  bonus_rules: { type: [BonusRuleSchema], default: [] },
  display_settings: { type: DisplaySettingsSchema, default: () => ({}) },
  commission_settings: { type: CommissionSettingsSchema, default: () => ({ roles: new Map(), users: new Map() }) },
  roles: { type: Map, of: Number, default: new Map() }
}, {
  collection: 'guild_configs'
});


module.exports = mongoose.model('GuildConfig', GuildConfigSchema);