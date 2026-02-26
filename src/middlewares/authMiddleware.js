// middlewares/authMiddleware.js

// Vérifie si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
}

// Vérifie le rôle
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.session.userstatus) {
      return res.redirect('/auth/login');
    }
    if (!roles.includes(req.session.userstatus)) {
      return res.status(403).send("Accès refusé");
    }
    next();
  };
}

module.exports = { isAuthenticated, authorizeRoles };