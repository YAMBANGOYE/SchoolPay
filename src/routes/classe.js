const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const classeController = require('../controllers/classeController');
const router = new express.Router();
const path = require('path');
const app = express();  
const upload = require('../middlewares/upload');


router.get("/", classeController.index);
//router.get("/:id/one", eleveController.getOne);
router.get("/create", classeController.create);
router.post("/create", classeController.store);
//router.get('/:id', eleveController.remove);

module.exports = router;