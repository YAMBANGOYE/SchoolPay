// models/niveau.js
const mongoose = require('mongoose');

const niveauSchema = new mongoose.Schema({
  ecole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole',
    required: true
  },

  libelle: { // 6ème, 5ème, Terminale...
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Niveau', niveauSchema);