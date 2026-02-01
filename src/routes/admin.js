const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const adminController = require('../controllers/adminController');
const router = new express.Router();
const path = require('path');
const app = express();  
const upload = require('../middlewares/upload');

router.get("/", adminController.index);


module.exports = router;