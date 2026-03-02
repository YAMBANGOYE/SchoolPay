const Inscription = require('../models/inscription');
const Activite = require('../models/activite');
const Facture = require('../models/facture');
const Paiement = require('../models/paiement');
const Niveau=  require('../models/niveau');

const PaiementEffectue = require('../models/paiementEffectue');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.index = async(req, res) => {
     try {

        const factures = await Facture.find({})
                .populate({
                    path: 'inscription',
                    populate: {
                    path: 'eleve'
                    }
                })
                .lean();
            res.render('paiement/show', {
                PaiementActive: 'active',
                Factures: factures
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.categorie = async(req, res) => {
     try {
           const niveaux = await Niveau.find({});
           console.log(niveaux);
            res.render('paiement/addcategorie', {
                PaiementActive: 'active',
                Niveau: niveaux,
                title: 'Catégorie de paiement'
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};

exports.storecategorie = async (req, res) => {
    
    try {
        const {
             libelle, type, montant, obligatoire } = req.body;

        const paiementData = {  libelle, type, montant, obligatoire };
          paiementData.ecole = req.session.userecoleId; // Associer la classe à une école
        // Création utilisateur
        const paiement = new Paiement(paiementData);
        await paiement.save();
        console.log('Paiement créé avec succès :', paiement);

         // Création activité
                await Activite.create({
                    user: req.session.userId, // ou req.user._id si connecté
                    ecole: req.session.userecoleId,
                    type: "CATEGORIE_PAIEMENT_CREEE",
                    message: `Nouveau categorie de paiement : ${libelle}`,
                      metadata: {
                          paiementId: paiement._id
                    }
                });

         res.redirect('/paiements/categorie');

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la création de l'utilisateur");
    }
};

exports.paiement = async(req, res) => {
     try {
           const inscriptions = await Inscription.find({}).populate('eleve').populate('classe').lean();
            const paiements = await Paiement.find({}).lean();

           console.log(inscriptions);
            res.render('paiement/paiement', {
                PaiementActive: 'active',
                Inscription: inscriptions,
                Paiement: paiements,
                title: 'Paiement'
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};

/// Générer un numéro de facture unique à 8 chiffres
const generateNumeroFacture = () => Math.floor(10000000 + Math.random() * 90000000).toString();

exports.creerFacture = async (req, res) => {
    
  try {
    const { inscription, paiementId, montantPaye } = req.body;

    // 1️⃣ Récupérer l'inscription et le paiement
    const inscriptionDoc = await Inscription.findById(inscription)
      .populate('eleve')
      .populate('ecole');
    const paiement = await Paiement.findById(paiementId);

    if (!inscriptionDoc || !paiement) return res.status(404).send("Données introuvables");

    let montantPayeFinal = parseFloat(montantPaye);

    if (montantPayeFinal > paiement.montant) {
  montantPayeFinal = paiement.montant;
}
    
    // 2️⃣ Créer la facture
    const facture = new Facture({
      inscription: inscriptionDoc._id,
      paiement: paiement._id,
      montantTotal: paiement.montant,
      montantPaye: montantPayeFinal || 0,
      statut: montantPayeFinal >= paiement.montant ? 'paye' : 'impaye',
      numeroFacture: generateNumeroFacture()
    });
    await facture.save();

    // 3️⃣ Enregistrer le paiement si déjà payé
    if (montantPayeFinal > 0) {
      const paiementEffectue = new PaiementEffectue({
        facture: facture._id,
        montant: montantPayeFinal,
        mode: req.body.mode || 'espèce',
        user: req.session.userId
      });
      await paiementEffectue.save();
    }

    // 4️⃣ Rediriger vers la version imprimable
    res.redirect(`/paiements/print/${facture._id}`);

  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création de la facture");
  }
};

exports.printFacture = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
      .populate({
        path: 'inscription',
        populate: { path: 'eleve ecole classe' }
      })
      .populate('paiement')
      .lean();

    if (!facture) return res.status(404).send("Facture introuvable");

    res.render('facture/print', { facture, title: 'Facture' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};