const mongoose = require('mongoose');

const paiementEffectueSchema = new mongoose.Schema({
  facture: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Facture', 
    required: true 
  },
  montant: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  mode: { 
    type: String, 
    enum: ['espèce', 'virement', 'carte', 'mobile'], 
    default: 'espèce' 
  },
  debiteur: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Vérifie si le modèle existe déjà pour éviter l'erreur
const PaiementEffectue = mongoose.models.PaiementEffectue || mongoose.model('PaiementEffectue', paiementEffectueSchema);

module.exports = PaiementEffectue;