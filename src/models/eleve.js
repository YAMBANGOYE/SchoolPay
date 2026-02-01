const mongoose = require('mongoose');
const validator = require('validator');

const Eleveschema = new mongoose.Schema({
    ecole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ecole', 
        required: false 
    },
    responsable: { 
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
    telephone: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    username: { 
        type: String,
        required: false 
    },
    
     status: {
        type: String,
        enum: ["A jour", "En attente", "En retarde"],
        required: false
    },
    datenaissance: { 
        type: String,
        required: true 
    },
    qrCode: String,       
    photo: String
}, { timestamps: true })



module.exports = mongoose.model('Eleve', Eleveschema);

