const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const adminController = require('../controllers/adminController');
const router = new express.Router();
const path = require('path');
const app = express();  
const upload = require('../middlewares/upload');

router.get("/online-partial", async (req, res) => {
  const Users = await User.find().lean();
  res.render("users/partials/onlineUsers", { Users, layout: false });
});

router.get("/superadmin", adminController.indexsuperadmin);
router.get("/adminschool", adminController.indexadminschool);


module.exports = router;