const path = require("path");
const session = require('express-session');
require('dotenv').config();
const { ConnectDb } = require('./src/services/mongoose');
const User = require('./src/models/user');
const userRoutes = require('./src/routes/users');
const adminRoutes = require('./src/routes/admin');
const ecoleRoutes = require('./src/routes/ecoles');
const classeRoutes = require('./src/routes/classe');
const { engine } = require("express-handlebars");


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret: 'tonSecretSuperSecreto', // clé secrète pour sécuriser la session
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

//config handlebars
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"views"));

ConnectDb().catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
/*
app.use(eleveRoutes);
app.use(ecoleRoutes);
app.use(classeRoutes);

*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});