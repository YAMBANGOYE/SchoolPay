const mongoose = require('mongoose');
const validator = require('validator');

const Anneeschema = new mongoose.Schema(
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

module.exports = mongoose.model('Ecole', Ecoleschema)
