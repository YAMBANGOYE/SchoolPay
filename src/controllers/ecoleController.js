const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const Ecole = require('../models/ecole');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

exports.index = async(req, res) => {

     try {
        const nbrEleves = await Ecole.countDocuments();
        const Eleves = await Ecole.find().lean();

        const ElevesFinal = Eleves.map(eleve => ({
            ...eleve,
      prenomCourt: eleve.nom ? eleve.nom.substring(0, 2) : ""
    }));
     
            res.render('ecole/show', { 
                Eleves: ElevesFinal,
                title: 'Liste des Etablissement',
                ecolesActive: 'active' ,
                nbrEleves : nbrEleves
             });
        } catch (error) {
            res.status(400).send(error);
        }
};
