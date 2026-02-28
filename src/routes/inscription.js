const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const inscriptionController = require('../controllers/inscriptionController');
const router = new express.Router();
const app = express();  



router.get("/", inscriptionController.index);
/*
router.get("/:id/one", inscriptionController.getOne);
router.get("/create", inscriptionController.create);
router.post("/create", inscriptionController.store);
router.get('/:id', inscriptionController.remove);
*/
module.exports = router;