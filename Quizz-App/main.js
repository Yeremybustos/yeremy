const params = new URLSearchParams(window.location.search);
const data = params.get("data");

let preguntas = [];
let indice = 0;
let respuestasUsuario = [];
let nombreUsuario = "";

if (data) {
  try {
    preguntas = JSON.parse(atob(decodeURIComponent(data)));
  } catch (e) {
    document.getElementById("quiz").innerHTML = "<p>Error al cargar las preguntas.</p>";
  }
} else {
  document.getElementById("quiz").innerHTML = "<p>No se encontraron preguntas.</p>";
}

function empezar() {
  nombreUsuario = document.getElementById("nombreUsuario").value.trim();
  if (!nombreUsuario) {
    alert("Por favor, escribe tu nombre.");
    return;
  }

  document.getElementById("nombreUsuario").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("btnSiguiente").style.display = "inline-block";

  mostrarPregunta();
}

function mostrarPregunta() {
  if (indice >= preguntas.length) {
    mostrarResultados();
    return;
  }

  const preguntaActual = preguntas[indice];
  const contenedor = document.getElementById("quiz");

  let html = `<h3>${preguntaActual.pregunta}</h3>`;
  preguntaActual.opciones.forEach((opcion, i) => {
    html += `
      <label>
        <input type="radio" name="respuesta" value="${i}">
        ${opcion}
      </label><br>
    `;
  });

  contenedor.innerHTML = html;
}

function siguiente() {
  const seleccion = document.querySelector('input[name="respuesta"]:checked');
  if (!seleccion) {
    alert("Selecciona una opción antes de continuar.");
    return;
  }

  respuestasUsuario.push(parseInt(seleccion.value));
  indice++;
  mostrarPregunta();
}

function mostrarResultados() {
  let correctas = 0;
  preguntas.forEach((preg, i) => {
    if (preg.correcta === respuestasUsuario[i]) correctas++;
  });

  const contenedor = document.getElementById("quiz");
  contenedor.innerHTML = `
    <h2>¡Gracias, ${nombreUsuario}!</h2>
    <p>Respuestas correctas: ${correctas} de ${preguntas.length}</p>
  `;
  document.getElementById("btnSiguiente").style.display = "none";
}
