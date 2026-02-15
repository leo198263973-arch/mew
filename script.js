function cambiarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => {
    p.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

const form = document.getElementById("formulario");
const mensajeExito = document.getElementById("mensaje-exito");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(form);

  fetch("https://formspree.io/f/mjgonagl", {
    method: "POST",
    body: data,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = "none";
      mensajeExito.style.display = "block";
      mensajeExito.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Algo salió mal 😿");
    }
  })
  .catch(() => {
    alert("Error de conexión 😿");
  });
});

function otraPregunta() {
  mensajeExito.style.display = "none";
  form.style.display = "block";
  form.reset();
  form.scrollIntoView({ behavior: "smooth" });
}
