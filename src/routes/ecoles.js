const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const ecoleController = require('../controllers/ecoleController');

const router = new express.Router();
const path = require('path');
const app = express();  
const upload = require('../middlewares/upload');


router.get("/", ecoleController.index);

module.exports = router;