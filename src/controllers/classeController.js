const express = require('express');
const mongoose = require('mongoose');
const Classe = require('../models/classe');
const Ecole = require('../models/ecole');
const Eleve = require('../models/eleve');
const upload = require('../middlewares/upload');
const Activite = require('../models/activite');
const path = require('path');


exports.index = async(req, res) => {

     try {
        const nbrClasses = await Classe.countDocuments();
        
        const Ecoles = await Ecole.find().lean();

        let filter = {};

    if (req.session.userstatus === "admin") {
      filter = { ecole: req.session.userecoleId };
    }

    // Si superadmin → filter reste vide → il voit tout

    const Classes = await Classe.find(filter)
      .populate("ecole")
      .lean();

        const ClassesFinal = Classes.map(classe => ({
            ...classe,
      prenomCourt: classe.libelle ? classe.libelle.substring(0, 2) : ""
    }));
     
            res.render('classe/show', { 
                Classes: ClassesFinal,
                Classes,
                Ecoles,
                title: 'Liste des classes',
                classesActive: 'active' ,
                nbrClasses : nbrClasses
             });
        } catch (error) {
            res.status(400).send(error);
        }
};
exports.getElevesWithClasse = async (req, res) => {

  try {
     const classeId = req.params.id;

    // Vérifier que la classe existe
    const classe = await Classe.findById(classeId).lean();
    if (!classe) {
      return res.status(404).send("Classe non trouvée");
    }
  
    // Récupérer les élèves + infos de la classe (populate)
    const eleves = await Eleve.find({ classe: classeId }).populate('classe').lean();

console.log(eleves);

    res.render('classe/eleves', {
      eleves,
      classe,
      title: 'Liste des élèves',
      classesActive: 'active'
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getElevesByClasse = async (req, res) => {
  try {
    const eleves = await Eleve.find({ classe: req.params.id })
      .populate('classe')
      .lean();

    res.render('classe/eleves', {
      eleves,
      role: req.session.role // pour conditionner certains éléments dans la vue
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

exports.create = async(req, res) => {
     try {
            const Ecoles = await Ecole.find().lean();
            
            res.render('classe/add', {
                classesActive: 'active',
                Ecoles,
                title: 'Creation de classes',
                }); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.store = async (req, res) => {
    
    try {
        const {
             libelle, abreviation, niveau, cycle } = req.body;

        const classeData = {  libelle, abreviation, niveau, cycle };
          classeData.ecole = req.session.userecoleId; // Associer la classe à une école
        // Création utilisateur
        const classe = new Classe(classeData);
        await classe.save();
        console.log('Classe créée avec succès :', classe);

         // Création activité
                await Activite.create({
                    user: req.session.userId, // ou req.user._id si connecté
                    ecole: req.session.userecoleId,
                    type: "CLASSE_CREEE",
                    message: `Nouvelle classe créée : ${libelle}`,
                      metadata: {
                          classeId: classe._id
                    }
                });

         res.redirect('/classes');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};
