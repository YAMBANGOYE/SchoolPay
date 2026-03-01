document.getElementById("anneeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);

  try {
    const response = await fetch("/ecoles/config", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
    });

    const data = await response.json();

    if (data.success) {

      form.reset();

      // Recharge uniquement le tableau
      const tableResponse = await fetch("/ecoles/config-table");
      const html = await tableResponse.text();

      document.getElementById("tableContainer").innerHTML = html;

      alert("Année scolaire créée avec succès ✅");
    }

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement ❌");
  }
});