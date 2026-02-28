const mongoose = require('mongoose');
const validator = require('validator');

const Inscriptionchema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole', 
        required: false 
    },
    responsable: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    eleve: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Eleve',
        required: true 
    },
    annee_scolaire: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annee_scolaire',
        required: true 
    },
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe',
        required: true 
    },

    qrCode: String
}, { timestamps: true })

module.exports = mongoose.model('Inscription', Inscriptionchema);