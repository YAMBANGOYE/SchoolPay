const express = require('express');
const User = require('../models/user');
const Ecole = require('../models/ecole');
const userController = require('../controllers/userController');
const router = new express.Router();
const path = require('path');
const app = express();  


router.get("/login", userController.login);

router.get("/logout", userController.logout);

//router.get("/dashboard", userController.index);

router.post("/login", userController.auth);


/*
// Endpoint to create a new user
router.post('/users', async (req, res, next) => {
    const user = new User(req.body);
   // console.log(req.body);
    try {
        const saveUser = await user.save();

        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Endpoint to get all users
router.get('/users', async (req, res, next) => {

    try {
        const users = await User.find().lean();
        const ecoles = await Ecole.find().lean();
       // res.render('test', { users, ecoles });
        res.send({ users, ecoles });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to get a user by ID
router.get('/users/:id', async (req, res, next) => {

    try {
        const users = await User.findById(req.params.id);
        if(!users) return res.status(404).send('User not found');
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to update a user by ID
router.patch('/users/:id', async (req, res, next) => {

    const updateInfo = Object.keys(req.body);
    try {
        const user = await User.findById(req.params.id);
        updateInfo.forEach((update) => user[update] = req.body[update]);
        await user.save();

       
    //     const users = await User.findByIdAndUpdate(req.params.id, req.body, { 
    //        new: true, 
    //       runValidators: true 
    //    });

        if(!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to delete a user by ID
router.delete('/users/:id', async (req, res, next) => {

    try {
        const users = await User.findByIdAndDelete(req.params.id);
        if(!users) return res.status(404).send('User not found');
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

*/
module.exports = router;