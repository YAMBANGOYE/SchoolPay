// models/Classe.js
const mongoose = require('mongoose');

const ClasseSchema = new mongoose.Schema(
  {
    ecoleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ecole',
      required: true
    },
    libelle: {
      type: String,
      required: true,
      trim: true
    },
    niveau: {
      type: String,
      enum: ["Primaire", "Collège", "Lycée"],
      required: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Classe', ClasseSchema);
