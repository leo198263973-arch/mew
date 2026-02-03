function cambiarPantalla(id) {
  const pantallas = document.querySelectorAll(".pantalla");

  pantallas.forEach(p => {
    p.classList.remove("activa");
  });

  const nueva = document.getElementById(id);
  nueva.classList.add("activa");
}
