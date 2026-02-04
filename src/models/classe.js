// models/Classe.js
const mongoose = require('mongoose');

const ClasseSchema = new mongoose.Schema(
  {
    ecole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ecole',
      required: true
    },
    libelle: {
      type: String,
      required: true,
      trim: true
    },
    abreviation: {
      type: String,
      required: true,
      trim: true
    },
    niveau: {
      type: String,
      required: true,
      trim: true
    },
    cycle: {
      type: String,
      enum: ["Primaire", "Collège", "Lycée"],
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Classe', ClasseSchema);
