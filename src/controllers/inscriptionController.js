const User = require('../models/inscription');

exports.index = (req, res) => {

    res.render("inscription/show", {
      title: "Inscription",
      InscriptionsActive: "active"
    });
};

exports.create = async(req, res) => {
     try {
           
            const Ecoles = await Ecole.find().lean();
            const Classes = await Classe.find().lean();
            
            res.render('inscription/add', {
                InscriptionsActive: 'active',
                Ecoles,
                Classes,
                title: 'Liste des élèves'
            }); 
        } catch (error) {
            res.status(400).send(error);
        }
};