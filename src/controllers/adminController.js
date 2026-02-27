const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const ecole = require('../models/ecole');
const Activite = require('../models/activite');
const Classe = require('../models/classe');
const QRCode = require('qrcode');
const upload = require('../middlewares/upload');


exports.indexsuperadmin = async(req, res) => {

    const nbrEleves = await Eleve.countDocuments();
    const userConnect = await User.countDocuments();
    const nbrEcoles = await ecole.countDocuments();
   
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

exports.indexadminschool = async(req, res) => {

    const nbrEleves = await Eleve.countDocuments({ 
  ecole: req.session.userecoleId
});
    const userConnect = await User.countDocuments();
    const nbrClasses = await Classe.countDocuments({ ecole: req.session.userecoleId });
    const activites = await Activite.find({ ecole: req.session.userecoleId }).populate('user').sort({ createdAt: -1 }).lean();

    const eleves = await Eleve.find().populate("ecole").lean();
   //const eleves = await Eleve.find({ ecole: { $exists: true } }).populate('ecole');
    console.log(eleves);
    res.render('admin/dashboardschool', {
        user: req.session.user,
        nbrEleves: nbrEleves,
        nbrClasses: nbrClasses,
        userConnect : userConnect,
        Eleves: eleves,
        Activites: activites,
        title: 'Tableau de bord',
        dashboardActive: 'active'
    });
};