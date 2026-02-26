const User = require('../models/user');
const router = require('express').Router();


// Inscription
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    console.log('Utilisateur enregistré :', user.username);
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.send('Erreur lors de l’inscription');
  }
});

// Inscription
router.get('/login', (req, res) => {
  res.render('auth/login',{ showMenu: false });
});


// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // ✅ déclaration ici

  const user = await User.findOne({ email });

  if (!user) {
    return res.render('auth/login', { error: 'Utilisateur introuvable' });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.render('auth/login', { error: 'Mot de passe incorrect' });
  }

  req.session.userId = user._id;
  req.session.username = user.username;
  req.session.userphoto = user.photo;
  req.session.userstatus = user.status;
<<<<<<< HEAD
  req.session.userecole = user.ecole ? user.ecole.toString() : null;

  formatDateSmart

  
console.log('Utilisateur connecté :', user.username, 'avec le rôle :', user.ecole);  

if (user.status === 'superadmin') {
  return res.redirect('/admin/superadmin');
} if (user.status === 'admin') {
  return res.redirect('/admin/adminschool');
} else {
  return res.redirect('/auth/login');
}
=======
  req.session.userecoles = user.ecoles;
  
console.log('Utilisateur connecté :', user.username, 'avec le rôle :', user.status);  
>>>>>>> c6d1fe3bc44089a1b93e531bd6092d36f4c60483

  res.redirect('/admin');
});


// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Erreur lors de la déconnexion');
    res.redirect('/auth/login');
  });
});

// Middleware pour protéger les routes
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/auth/login');
}

// Dashboard protégé
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { username: req.session.username });
});

module.exports = router;
