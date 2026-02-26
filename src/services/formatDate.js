function formatDateSmart(date) {
  const d = new Date(date);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  if (isToday) {
    // On affiche juste l'heure
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } else {
    // On affiche juste la date
    return d.toLocaleDateString('fr-FR');
  }
}

module.exports = {
    formatDateSmart
}