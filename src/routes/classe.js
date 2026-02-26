const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const classeController = require('../controllers/classeController');
const router = new express.Router();
const path = require('path');
const app = express();  
const { isAuthenticated, authorizeRoles } = require('../middlewares/authMiddleware');


router.get("/", 
    isAuthenticated,
    authorizeRoles('admin', 'professeur'), // doit **retourner une fonction**
    classeController.index);

//router.get("/:id/one", eleveController.getOne);
router.get("/create", isAuthenticated,
    authorizeRoles('admin', 'professeur'), // doit **retourner une fonction**
    classeController.create);

router.post("/create", isAuthenticated,
    authorizeRoles('admin', 'professeur'), // doit **retourner une fonction**
    classeController.store);
    
router.get("/:id/eleve", isAuthenticated,
    authorizeRoles('admin', 'professeur'), // doit **retourner une fonction**
    classeController.getElevesWithClasse);

router.get(
  '/:id/eleves',
  isAuthenticated,
  authorizeRoles('admin', 'SUPER_ADMIN','contribuable'), // doit **retourner une fonction**
  classeController.getElevesByClasse
);
//router.get('/:id', eleveController.remove);

module.exports = router;