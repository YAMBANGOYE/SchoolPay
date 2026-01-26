const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const ecole = require('../models/ecole');
const QRCode = require('qrcode');
const upload = require('../middlewares/upload');


exports.index = async(req, res) => {

    /*
     if (!req.session.user) {
        return res.redirect('/login');
    }
 */
    const nbrEleves = await Eleve.countDocuments();
    const nbrEcoles = await ecole.countDocuments();
    console.log('Nombre d\'élèves :', nbrEleves);
    console.log('Nombre d\'écoles :', nbrEcoles);
    const eleves = await Eleve.find().populate("ecole").lean();
   //const eleves = await Eleve.find({ ecole: { $exists: true } }).populate('ecole');
    console.log(eleves);
    res.render('ecole/dashboard', {
        user: req.session.user,
        nbrEleves: nbrEleves,
        nbrEcoles: nbrEcoles,
        Eleves: eleves,
        title: 'Tableau de bord',
        dashboardActive: 'active'
    });
};

exports.eleveList = async(req, res) => {

     try {
        const Eleves = await Eleve.find().populate("ecole").populate("ecole").populate("user").lean();

        const ElevesFinal = Eleves.map(eleve => ({
            ...eleve,
      prenomCourt: eleve.nom ? eleve.nom.substring(0, 2) : ""
    }));
     
            res.render('eleve/show', { 
                Eleves: ElevesFinal,
                title: 'Liste des élèves',
                elevesActive: 'active' 
             });
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.detailEleve = async(req, res) => {
     try {
        const Eleves = await Eleve.findOne({_id: req.params.id}).populate("ecole").populate("user").lean();
        console.log(Eleves);
            res.render('eleve/detail', { 
                Eleves: Eleves,
                title: 'Profil élève'}); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.eleveAdd = async(req, res) => {
     try {

            res.render('eleve/add', { 
                title: 'Ajouter Eleve'}); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.eleveStore = async (req, res) => {
    console.log(req.body);
    try {
        const {
            nom,
            prenom,
            username,
            email,
            telephone,
            datenaissance,
            status
        } = req.body;

        const userData = { nom, prenom, username, email, telephone, datenaissance, status };

        // Génération du QR code
        const qrText = `ELEVE-${telephone}-${Date.now()}`;
        const qrCode = await QRCode.toDataURL(qrText);
        userData.qrCode = qrCode;

        // Upload photo
        if (req.file) {
            userData.photo = req.file.filename; // ⚡ juste le nom du fichier
        }

        // Création utilisateur
        const user = new Eleve(userData);
        await user.save();
        console.log('Élève créé avec succès :', user);

        // Affichage Handlebars avec image
        res.render('eleve/show', { 
            message: 'Élève créé avec succès !',
            title: 'Ajouter Eleve',
            eleve: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};
