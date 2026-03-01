const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const Ecole = require('../models/ecole');
const Annee = require('../models/annee_scolaire');
const Activite = require('../models/activite');
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

exports.config = async(req, res) => {

    const annee_scolaire = await Annee.find().lean();

    res.render("ecole/config", {
      title: "Configuration",
      configActive: "active",
      annee_scolaire: annee_scolaire
    });
};

exports.storeConfig = async (req, res) => {
    
    try {
        const {
             libelle, dateDebut, dateFin } = req.body;

        const anneeData = {  libelle, dateDebut, dateFin };
          anneeData.ecole = req.session.userecoleId; // Associer la classe à une école
        // Création utilisateur
        const annee = new Annee(anneeData);
        await annee.save();
        console.log('Année scolaire créée avec succès :', annee);
         // Création activité
                await Activite.create({
                    user: req.session.userId, // ou req.user._id si connecté
                    ecole: req.session.userecoleId,
                    type: "ANNEE_SCO_CREEE",
                    message: `Nouvelle année scolaire créée : ${libelle}`,
                      metadata: {
                          anneeId: annee._id,
                          ecoleId: req.session.userecoleId
                    }
                });

         res.redirect('/ecoles/config');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};