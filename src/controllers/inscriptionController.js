const express = require('express');
const mongoose = require('mongoose');
const Inscription = require('../models/inscription');
const Eleve = require('../models/eleve');
const Classe = require('../models/classe');
const Activite = require('../models/activite');

exports.index = async (req, res) => {

  const ecoleId = req.session.userecoleId;

  // 🔹 Liste des inscriptions
  const inscriptions = await Inscription.find({ 
    ecole: ecoleId 
  })
  .populate('classe')
  .populate('eleve')
  .sort({ createdAt: -1 })
  .lean();


  // 🔹 Calcul début / fin du mois
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // 🔹 Aggregation MongoDB
  const stats = await Inscription.aggregate([
    {
      $match: {
        ecole: new mongoose.Types.ObjectId(ecoleId),
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth
        }
      }
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  // 🔹 Remplir les jours à 0
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  let fullStats = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const found = stats.find(s => s._id === i);
    fullStats.push({
      day: i,
      total: found ? found.total : 0
    });
  }

  res.render("inscription/show", {
    title: "Inscription",
    InscriptionsActive: "active",
    inscriptions,
    inscriptionStats: fullStats
  });
};

exports.create = async(req, res) => {
     try {
           
            const Eleves = await Eleve.find({ ecole: req.session.userecoleId }).lean();
            const Classes = await Classe.find({ ecole: req.session.userecoleId }).lean();
            
            
            res.render('inscription/add', {
                InscriptionsActive: 'active',
                Eleves,
                Classes,
                title: 'Liste inscriptions'
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.store = async (req, res) => {
    
    try {
        const {
             responsable, eleve, classe } = req.body;

        const inscriptionData = {  responsable, eleve, classe };
        inscriptionData.ecole = req.session.userecoleId; // Associer la classe à une école
        /* Fais un vrai truc sur l'annee scolaire c'est simple lors de la connection l'utilisateur selectionne l'annne scolaire

        inscriptionData.annee_scolaire = req.session.annee_scolaire; 

            */

        // Création utilisateur
        const inscrciption = new Inscription(inscriptionData);
        await inscrciption.save();
        console.log('inscrciption créée avec succès :', inscrciption);

         // Création activité
                await Activite.create({
                    user: req.session.userId, // ou req.user._id si connecté
                    ecole: req.session.userecoleId,
                    type: "INSCRIPTION_CREEE",
                    message: `Nouvelle inscrciption créée : ${responsable}`,
                      metadata: {
                          classeId: classe._id
                    }
                });

         res.redirect('/inscriptions/create');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};
