const mongoose = require('mongoose');
const validator = require('validator');

const Annee_scolairechema = new mongoose.Schema(
  {
    ecole: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ecole',
          required: true
        },

    libelle: {
      type: String,
      required: true,
      trim: true
    },

    dateDebut: {
      type: String
    },

    dateFin: {
      type: String
    },

    active: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Annee_scolaire', Annee_scolairechema)
