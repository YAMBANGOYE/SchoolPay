const mongoose = require('mongoose');
const validator = require('validator');

const Ecoleschema = new mongoose.Schema(
  {
    libelle: {
      type: String,
      required: true,
      trim: true
    },

    addresse: {
      type: String
    },

    contact: {
      type: String
    },

    email: {
      type: String,
      lowercase: true
    },

    nomDuResponsable: {
      type: String
    },

    academicYear: {
      type: String, // ex: "2024-2025"
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    settings: {
      paymentMethods: {
        type: [String],
        default: ["CASH", "MOBILE_MONEY", "BANK_TRANSFER"]
      },
      allowOnlinePayment: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Ecole', Ecoleschema)
