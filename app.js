const path = require("path");
const session = require('express-session');
require('dotenv').config();
const { ConnectDb } = require('./src/services/mongoose');
const User = require('./src/models/user');
const userRoutes = require('./src/routes/users');
const eleveRoutes = require('./src/routes/eleves');
const adminRoutes = require('./src/routes/admin');
const ecoleRoutes = require('./src/routes/ecoles');
const classeRoutes = require('./src/routes/classe');
const AuthRoutes = require('./src/routes/auth');
const { engine } = require("express-handlebars");
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/fr'); // Français

dayjs.extend(relativeTime);
dayjs.locale('fr'); // mettre le français par défaut

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// STATIC
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));

// ✅ MongoStore correct pour connect-mongo v6
const MongoStore = require('connect-mongo').default;

app.use(session({
  secret: 'tonSecretUltraSecurise',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://kristolyambangoye_db_user:sqL9g0Y1CJrFvY58@cluster0.fwbytb3.mongodb.net/?appName=Cluster0'
,
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 jour
}));

// Handlebars
app.engine('handlebars', engine({
  helpers: {
  formatDateRelative: function(date) {
    const d = dayjs(date);
    if (d.isSame(dayjs(), 'day')) {
      return d.fromNow(); // "il y a 5 minutes"
    } else {
      return d.format('DD/MM/YYYY'); // "25/02/2026"
    }
  }
}
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"views"));

// Connect DB
ConnectDb().catch(err => console.log(err));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Rendre l'utilisateur disponible dans toutes les vues
app.use((req, res, next) => {
  res.locals.showMenu = true; // Par défaut, afficher le menu
  res.locals.currentUser = req.session.username || null;
  res.locals.currentStatus = req.session.userstatus || null;
  res.locals.currentPhoto = req.session.userphoto || null;
  res.locals.currentEcole = req.session.userecole || null;
<<<<<<< HEAD

=======
>>>>>>> c6d1fe3bc44089a1b93e531bd6092d36f4c60483
  next();
});

// Routes
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/ecoles", ecoleRoutes);
app.use("/auth",AuthRoutes);
app.use("/eleves",eleveRoutes);
app.use("/classes",classeRoutes);






// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
