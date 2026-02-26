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

exports.register = async(req, res) => {

    const ecoles = await ecole.find().lean();

    res.render("user/add", {
      Title: "Connection",
      ecoles
    });
};
 
exports.show = async (req, res) => {
    //chercher utilisateur en ligne
    //const userenligne = await Eleve.findOne({_id: req.params.id}).countDocuments();

    const nbrUser = await User.countDocuments();
    const users = await  User.find().lean();

 
    res.render("user/usershow", {
      Title: "Connection",
      users: users,
      nbrUser: nbrUser,
      userActive: 'active'
      
    });
};

exports.showOne = async (req, res) => {
  
     try {
            const Users = await User.findOne({_id: req.params.id}).lean();
            console.log(Users);
                res.render('user/detail', { 
                    Users: Users,
                    userActive: 'active',
                    title: 'Compte utilisateur'}); 
            } catch (error) {
                res.status(400).send(error);
            }
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
            status,
            ecole
         } = req.body;
        const user = new User({ 
            nom,
            prenom,
            username, 
            email, 
            telephone,
            status,
            password,
            ecole
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