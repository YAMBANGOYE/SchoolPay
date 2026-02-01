const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const eleveController = require('../controllers/eleveController');
const router = new express.Router();
const path = require('path');
const app = express();  
const upload = require('../middlewares/upload');


router.get("/", eleveController.index);
router.get("/:id/one", eleveController.getOne);
router.get("/create", eleveController.create);
router.post("/create", upload.single('photo'), eleveController.store);
router.get('/:id', eleveController.remove);

module.exports = router;