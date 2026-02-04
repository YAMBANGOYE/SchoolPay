const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const ecole = require('../models/ecole');
const QRCode = require('qrcode');
const upload = require('../middlewares/upload');


exports.index = async(req, res) => {

    const nbrEleves = await Eleve.countDocuments();
    const userConnect = await User.countDocuments();
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
        userConnect : userConnect,
        Eleves: eleves,
        title: 'Tableau de bord',
        dashboardActive: 'active'
    });
};
