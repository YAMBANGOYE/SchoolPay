const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const Classe = require('../models/classe');
const Activite = require('../models/activite');
const Facture = require('../models/facture');
const QRCode = require('qrcode');
const Paiement = require('../models/paiement');
const upload = require('../middlewares/upload');
const path = require('path');
const fs = require('fs');
const paiement = require('../models/paiement');
const Inscription = require('../models/inscription');
const PaiementEfectue = require('../models/paiementEffectue');


exports.index = async (req, res) => {
  try {
    const nbrEleves = await Eleve.countDocuments({
      ecole: req.session.userecoleId
    });

    const Inscriptions = await Inscription.find({
      ecole: req.session.userecoleId
    })
      .populate("eleve")
      .populate("classe")
      .populate("responsable")
      .populate("ecole")
      .lean();

    for (let inscription of Inscriptions) {
      const factures = await Facture.find({ inscription: inscription._id }).lean();
      let totalFacture = 0;
      let totalPaye = 0;

      
      for (let facture of factures) {
        totalFacture += facture.montantTotal;
        const paiements = await PaiementEfectue.find({ facture: facture._id }).lean();
        totalPaye += paiements.reduce((acc, p) => acc + p.montant, 0);
      console.log(`Total facture pour inscription ${inscription.eleve.nom}: ${totalFacture} - Total payé: ${totalPaye} =  Reste: ${totalFacture - totalPaye}`);
      
      }
      console.log("-------------------------------------------------");
      console.log(`Last Total facture pour inscription ${inscription.eleve.nom}: ${totalFacture} - Total payé: ${totalPaye} =  Reste: ${totalFacture - totalPaye}`);
      const resteTotal = totalFacture - totalPaye;

      
      if (resteTotal === 0) {
        inscription.status = "A jour";
      } else if (totalPaye === 0) {
        inscription.status = "En retarde";
      } else {
        inscription.status = "En attente";
      }
    }

    const Ecoles = await Ecole.find().lean();

    res.render('eleve/show', {
      Inscriptions,
      Ecoles,
      title: 'Liste des élèves',
      elevesActive: 'active',
      nbrEleves
    });
  } catch (error) {
    console.error(error);
    res.status(400).send('Erreur serveur');
  }
};

exports.getOne = async(req, res) => {
     try {
        const Eleves = await Eleve.findOne({_id: req.params.id}).populate("ecole").populate("responsable").lean();
        console.log(Eleves);
            res.render('eleve/detail', { 
                Eleves: Eleves,
                elevesActive: 'active',
                title: 'Profil élève'}); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.create = async(req, res) => {
     try {
            const Users = await User.find().lean();
            const Ecoles = await Ecole.find().lean();
            const Classes = await Classe.find().lean();
            const Paiements = await Paiement.find().lean();
            
            res.render('eleve/add', {
                elevesActive: 'active',
                Ecoles,
                Classes,
                Paiements,
                title: 'Liste des élèves',
                Users}); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.store = async (req, res) => {
    console.log(req.body);
    try {
        const {
            nom, prenom, username, email, telephone, datenaissance, status, responsable, ecole, classe 
         } = req.body;

     const userData = {
        nom,
        prenom,
        username,
        email,
        telephone,
        datenaissance,
        status,
        responsable,
        ecole,
        classe
        };

        // Génération du QR code
        const qrText = `ELEVE-${telephone}-${Date.now()}`;
        const qrCode = await QRCode.toDataURL(qrText);
        userData.qrCode = qrCode;

        // Upload photo
        if (req.file) {
            userData.photo = req.file.filename; // juste le nom du fichier
        }

        // Création utilisateur
        const eleve = new Eleve(userData);
        await eleve.save();
        console.log('Élève créé avec succès :', eleve);

        // Création inscription
        const inscriptionData = {
            ecole,
            eleve: eleve._id,
            classe,
            responsable,
            paiement: req.body.paiement
        };
        const inscription = new Inscription(inscriptionData);
        await inscription.save();
        console.log('Inscription créée avec succès :', inscription);


        // Création activité
        await Activite.create({
            user: req.session.userId, // ou req.user._id si connecté
            ecole: req.session.userecoleId,
            type: "ELEVE_AJOUTE",
            message: `Nouvel élève ajouté : ${prenom} ${nom}`,
            metadata: {
                eleveId: eleve._id,
                classe: classe
            }
        });

         res.redirect('/eleves');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  // 1️⃣ Vérifier l'ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  // 2️⃣ Récupérer l’élève
  const eleve = await Eleve.findById(id);
  if (!eleve) {
    return res.status(404).json({ message: 'Élève introuvable' });
  }

  // 3️⃣ Supprimer la photo
  if (eleve.photo) {
    const photoPath = path.join(__dirname, '..', eleve.photo);
    console.log(eleve.photo);
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
  }

          // 🔥 Création activité
        await Activite.create({
            user: req.session.userId, // ou req.user._id si connecté
            ecole: req.session.userecole,
            type: "ELEVE_SUPPRIME",
            message: `Élève supprimé : ${eleve.prenom} ${eleve.nom}`,
            metadata: {
                eleveId: eleve._id,
                classe: eleve.classe
            }
        });

  // 4️⃣ Supprimer l’élève
  await Eleve.findByIdAndDelete(id);

   res.redirect('/eleves');
};
