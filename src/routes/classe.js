const express = require('express');
const Classe = require('../models/classe');
const router = new express.Router();
const path = require('path');
const app = express();  

router.post('/classe', async (req, res, next) => {
  const classe = new Classe(req.body);
  try {

    const saveClasse = await classe.save();
    res.status(201).send(saveClasse);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/classe', async (req, res) => {
  try {
        const classes = await Classe.find().lean();
 
        res.render('test', { classes });
      //  res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;