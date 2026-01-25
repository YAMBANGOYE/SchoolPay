const express = require('express');
const Eleve = require('../models/eleve');
const Ecole = require('../models/ecole');

const router = new express.Router();
const path = require('path');
const app = express();  

router.post('/eleve', async (req, res, next) => {
    const eleve = new Eleve(req.body);
    try {

        const saveEleve = await eleve.save();
        res.status(201).send(saveEleve);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/eleves', async (req, res) => {
  try {
        const eleves = await Eleve.find().lean();
 console.log(eleves);
        res.render('ecole/eleve', { eleves });
        //res.send(eleves);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/elevecreate', async (req, res) => {
 
  try {
        const eleves = await Eleve.find().lean();
        const ecoles = await Ecole.find().lean();
 
        res.render('ecole/elevecreate', { ecoles });
        //res.send(eleves);
    } catch (error) {
        res.status(400).send(error);
    }

 // res.render('elevecreate');
});
module.exports = router;