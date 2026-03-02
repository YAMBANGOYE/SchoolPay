const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
    
  inscription: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Inscription', 
    required: true 
},
  paiement: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paiement', 
    required: true 
},
  montantTotal: { 
    type: Number, 
    required: true 
},
  montantPaye: { type: Number, 
    default: 0 
},
  statut: { 
    type: String, 
    enum: ['impaye', 'partiel', 'paye'], 
    default: 'impaye' 
},
  numeroFacture: { 
    type: String, 
    unique: true 
}
}, { timestamps: true });

module.exports = mongoose.model('Facture', factureSchema);