document.getElementById("anneeForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    libelle: this.libelle.value,
    dateDebut: this.dateDebut.value,
    dateFin: this.dateFin.value
  };

  try {
    const response = await fetch("/ecoles/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      // reset le formulaire
      this.reset();

      // fetch du tableau à jour
      const tableRes = await fetch("/ecoles/config-table");
      const html = await tableRes.text();
      document.getElementById("tableContainer").innerHTML = html;
    }
  } catch (err) {
    console.error(err);
  }
});