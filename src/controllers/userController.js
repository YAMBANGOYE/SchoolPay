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

exports.register = (req, res) => {

    res.render("user/add", {
      Title: "Connection"
    });
};
 
exports.show = async (req, res) => {
    //chercher utilisateur en ligne
  //  const userenligne = await Eleve.findOne({_id: req.params.id}).countDocuments();

    const nbrUser = await User.countDocuments();
    const users = await  User.find().lean();
 
    res.render("user/usershow", {
      Title: "Connection",
      users: users,
      nbrUser: nbrUser,
      userActive: 'active'
      
    });
};

exports.store = async (req, res) => {

    try {
        const { 
            nom,
            prenom,
            username, 
            email, 
            telephone,
            password,
            status
         } = req.body;
        const user = new User({ 
            nom,
            prenom,
            username, 
            email, 
            telephone,
            status,
            password
        });

         if (req.file) {
            user.photo = req.file.filename; // ⚡ juste le nom du fichier
        }
        await user.save();
        console.log('Utilisateur enregistré :', user.username);
        res.redirect('/user/login');
      } catch (err) {
        console.error(err);
        res.send('Erreur lors de l’inscription');
      }

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