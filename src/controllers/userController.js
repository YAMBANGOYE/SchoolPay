const express = require('express');
const mongoose = require('mongoose');
const Eleve = require('../models/eleve');
const User = require('../models/user');
const ecole = require('../models/ecole');


//Creation du formulaire de creation


exports.login = (req, res) => {

    res.render("login", {
      Title: "Connection"
    });
};



exports.logout = (req, res) => {

     req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la déconnexion');
            }
            // Supprime le cookie de session
            res.clearCookie('connect.sid');
    
            // Redirection vers login
            res.redirect('/login');
        });
}; 

exports.auth = async(req, res) => { 
    
   try {
    console.log(req.body.email, req.body.password);

    //petit probleme ici
        const user = await User.findUser(req.body.email, req.body.password);
        
       // console.log(req.body.email, req.body.password);
     req.session.user = {
            id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
            ecoleId: user.ecoleId
        };
        res.redirect('/dashboard');
    
    } catch (error) {
  
        res.redirect('/login')
    }
};