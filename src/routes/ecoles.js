const express = require('express');
const Ecole = require('../models/ecole');
const router = new express.Router();
const path = require('path');
const app = express();  

router.post('/ecole', async (req, res, next) => {
    const ecole = new Ecole(req.body);
    try {

        const saveEcole = await ecole.save();
        res.status(201).send(saveEcole);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/ecole', async (req, res) => {
  try {
        const ecoles = await Ecole.find().lean();
 
        //res.render('test', { ecoles });
        res.send(ecoles);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;