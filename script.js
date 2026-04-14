function cambiarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => {
    p.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

const form = document.getElementById("formulario");
const mensajeExito = document.getElementById("mensaje-exito");
const sonido = document.getElementById("sonido-exito");
const contadorTexto = document.getElementById("contador");
const lista = document.getElementById("lista-preguntas");

// 🔢 contador
let contador = localStorage.getItem("preguntas") || 0;
contadorTexto.textContent = "💌 Preguntas enviadas: " + contador;

// 💬 preguntas guardadas
let preguntas = JSON.parse(localStorage.getItem("listaPreguntas")) || [];

// mostrar preguntas
function mostrarPreguntas() {
  if (!lista) return;

  lista.innerHTML = "";
  preguntas.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("pregunta-item");
    div.textContent = "💌 " + p;
    lista.appendChild(div);
  });
}

mostrarPreguntas();

// ✨ brillos
function crearBrillos() {
  const contenedor = document.getElementById("brillos");
  if (!contenedor) return;

  for (let i = 0; i < 20; i++) {
    const b = document.createElement("div");
    b.classList.add("brillo");

    b.style.left = Math.random() * 100 + "vw";
    b.style.top = "80%";

    contenedor.appendChild(b);

    setTimeout(() => b.remove(), 1000);
  }
}

// 🚀 enviar formulario
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

      const texto = form.querySelector("textarea").value;

      // guardar pregunta
      preguntas.push(texto);
      localStorage.setItem("listaPreguntas", JSON.stringify(preguntas));

      mostrarPreguntas();

      // ocultar form
      form.style.display = "none";

      // mostrar mensaje con animación
      mensajeExito.classList.add("mostrar");

      // ✨ brillos
      crearBrillos();

      // 🐾 sonido
      if (sonido) sonido.play();

      // 🔢 contador
      contador++;
      localStorage.setItem("preguntas", contador);
      contadorTexto.textContent = "💌 Preguntas enviadas: " + contador;

      mensajeExito.scrollIntoView({ behavior: "smooth" });

    } else {
      alert("Algo salió mal 😿");
    }
  })
  .catch(() => {
    alert("Error de conexión 😿");
  });
});

// 🔁 volver a preguntar
function otraPregunta() {
  mensajeExito.classList.remove("mostrar");
  form.style.display = "block";
  form.reset();
  form.scrollIntoView({ behavior: "smooth" });
}