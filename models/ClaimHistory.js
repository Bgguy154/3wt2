const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  claimedPoints: Number,
  claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClaimHistory', claimSchema);
