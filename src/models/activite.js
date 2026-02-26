const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  ecole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  },

  type: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  metadata: {
    type: Object
  }

}, { timestamps: true });

activitySchema.index({ ecole: 1, createdAt: -1 });

module.exports = mongoose.model('Activite', activitySchema);