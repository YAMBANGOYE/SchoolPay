const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const ecole = require('../models/ecole');


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
        title: 'Tableau de bord'
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
                title: 'Liste des élèves'
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