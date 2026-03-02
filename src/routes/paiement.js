const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const paiementController = require('../controllers/paiementController');
const router = new express.Router();
const app = express();  

router.get("/", paiementController.index);
router.get("/categorie", paiementController.categorie);
router.post("/categorie", paiementController.storecategorie);
router.get("/paiement", paiementController.paiement);
router.post("/paiement", paiementController.creerFacture); 
router.get('/print/:id', paiementController.printFacture);
//router.post("/tarifs", paiementController.store);

/*
router.get("/:id/one", inscriptionController.getOne);

router.get("/create", inscriptionController.create);
router.post("/create", inscriptionController.store);
router.get('/:id', inscriptionController.remove);
*/
module.exports = router;