const mongoose = require('mongoose');
const validator = require('validator');

const Eleveschema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
   
    nom: { 
        type: String, 
        required: true 
    },
    prenom: { 
        type: String,
        required: true 
    },
     status: {
        type: String,
        enum: ["A jour", "En attente", "En retarde"],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Eleve', Eleveschema);

