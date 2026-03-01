// models/tarif.js
const mongoose = require('mongoose');

const tarifSchema = new mongoose.Schema({

  ecole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole',
    required: true
  },

  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
    required: true
  },

  type: {
    type: String,
    enum: ['inscription', 'mensualite', 'transport', 'cantine'],
    required: true
  },

  montant: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Tarif', tarifSchema);