const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  ecole: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ecole', required: true 
  },
  libelle: { 
    type: String, 
    required: true 
  }, // "Mensualité", "Inscription", "Tenue scolaire"
  type: { 
    type: String, enum: ['unique', 'mensuel', 'annuel'], 
    required: true 
  },
  montant: { 
    type: Number, 
    required: true 
  },
  obligatoire: { 
    type: Boolean, 
    default: true 
  },
  actif: { 
    type: Boolean,
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Paiement', paiementSchema);