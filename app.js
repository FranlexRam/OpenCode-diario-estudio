const CLAVE_ALMACENAMIENTO = "diarioEstudio.sesiones";
const CLAVE_TEMA = "diarioEstudio.tema";

const DIAS_SEMANA = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function nivelDeMinutos(minutos) {
  if (minutos <= 0) {
    return 0;
  }
  if (minutos < 30) {
    return 1;
  }
  if (minutos < 60) {
    return 2;
  }
  return 3;
}

function minutosPorDia(sesiones) {
  const porDia = {};
  for (const sesion of sesiones) {
    porDia[sesion.fecha] = (porDia[sesion.fecha] || 0) + sesion.minutos;
  }
  return porDia;
}

function semanasDelPeriodo(hoy, numSemanas) {
  const [anio, mes, dia] = hoy.split("-").map(Number);
  const fechaHoy = new Date(anio, mes - 1, dia);
  const diaSemana = fechaHoy.getDay();
  const desplazamiento = diaSemana === 0 ? -6 : 1 - diaSemana;
  const lunes = new Date(anio, mes - 1, dia + desplazamiento);
  const inicio = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() - (numSemanas - 1) * 7);

  const semanas = [];
  for (let s = 0; s < numSemanas; s++) {
    const semana = [];
    for (let d = 0; d < 7; d++) {
      const fecha = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + s * 7 + d);
      semana.push(fechaLocal(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate()));
    }
    semanas.push(semana);
  }
  return semanas;
}

function etiquetaTooltip(fechaISO, minutos) {
  return minutos > 0 ? `${minutos} min` : "Sin sesión";
}

function celdaDeDia(fechaISO, minutosHoy) {
  return { fecha: fechaISO, minutos: minutosHoy, nivel: nivelDeMinutos(minutosHoy) };
}

function resolverTema(guardado, prefiereOscuro) {
  if (guardado === "dark" || guardado === "light") {
    return guardado;
  }
  return prefiereOscuro ? "dark" : "light";
}

function temaInicial() {
  const guardado = localStorage.getItem(CLAVE_TEMA);
  if (guardado === "dark" || guardado === "light") {
    return guardado;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
}

function alternarTema() {
  const actual = document.documentElement.getAttribute("data-theme") || "light";
  const nuevo = actual === "dark" ? "light" : "dark";
  aplicarTema(nuevo);
  localStorage.setItem(CLAVE_TEMA, nuevo);
  return nuevo;
}

function actualizarBotonTema(tema) {
  const esOscuro = tema === "dark";
  botonTema.setAttribute("aria-label", esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  botonTema.querySelector("[aria-hidden]").textContent = esOscuro ? "☀️" : "🌙";
  botonTema.querySelector(".boton-tema__texto").textContent = esOscuro ? "Claro" : "Oscuro";
}

let formulario, campoFecha, campoTema, campoMinutos, mensajeError;
let listaSesiones, listaVacia, rachaDias, rachaDetalle, mejorRachaDias;
let botonTema;
let sesiones;

if (typeof document !== "undefined") {
  formulario = document.getElementById("formulario");
  campoFecha = document.getElementById("fecha");
  campoTema = document.getElementById("tema");
  campoMinutos = document.getElementById("minutos");
  mensajeError = document.getElementById("error");
  listaSesiones = document.getElementById("listaSesiones");
  listaVacia = document.getElementById("listaVacia");
  rachaDias = document.getElementById("rachaDias");
  rachaDetalle = document.getElementById("rachaDetalle");
  mejorRachaDias = document.getElementById("mejorRachaDias");
  botonTema = document.getElementById("botonTema");

  sesiones = leerSesiones();
}

function leerSesiones() {
  const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (!datos) {
    return [];
  }
  try {
    const guardadas = JSON.parse(datos);
    return Array.isArray(guardadas) ? guardadas : [];
  } catch (error) {
    return [];
  }
}

function guardarSesiones() {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(sesiones));
}

function fechaLocal(anio, mes, dia) {
  const mesConCero = String(mes).padStart(2, "0");
  const diaConCero = String(dia).padStart(2, "0");
  return `${anio}-${mesConCero}-${diaConCero}`;
}

function hoy() {
  const ahora = new Date();
  return fechaLocal(ahora.getFullYear(), ahora.getMonth() + 1, ahora.getDate());
}

function moverDia(fechaISO, dias) {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  const nueva = new Date(anio, mes - 1, dia + dias);
  return fechaLocal(nueva.getFullYear(), nueva.getMonth() + 1, nueva.getDate());
}

function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return `${DIAS_SEMANA[fecha.getDay()]} ${dia} ${MESES[mes - 1]} ${anio}`;
}

function calcularRacha() {
  const diasConSesion = new Set(sesiones.map((sesion) => sesion.fecha));
  const hoyISO = hoy();

  let cursor = diasConSesion.has(hoyISO) ? hoyISO : moverDia(hoyISO, -1);
  if (!diasConSesion.has(cursor)) {
    return 0;
  }

  let racha = 0;
  while (diasConSesion.has(cursor)) {
    racha = racha + 1;
    cursor = moverDia(cursor, -1);
  }
  return racha;
}

function calcularMejorRacha() {
  const diasConSesion = new Set(sesiones.map((sesion) => sesion.fecha));
  const diasOrdenados = [...diasConSesion].sort();

  let mejor = 0;
  let racha = 0;
  let diaAnterior = null;

  for (const dia of diasOrdenados) {
    if (diaAnterior !== null && moverDia(diaAnterior, 1) === dia) {
      racha = racha + 1;
    } else {
      racha = 1;
    }
    if (racha > mejor) {
      mejor = racha;
    }
    diaAnterior = dia;
  }

  return mejor;
}

function pintarRacha() {
  const racha = calcularRacha();
  const mejorRacha = calcularMejorRacha();
  const estudiasteHoy = sesiones.some((sesion) => sesion.fecha === hoy());

  rachaDias.textContent = racha;
  mejorRachaDias.textContent = mejorRacha;

  if (racha === 0) {
    rachaDetalle.textContent = "Registra una sesión para empezar tu racha.";
  } else if (estudiasteHoy) {
    rachaDetalle.textContent = "Hoy ya has estudiado. ¡Sigue así!";
  } else {
    rachaDetalle.textContent = "Hoy todavía no has estudiado. ¡No dejes que se rompa!";
  }
}

function crearElementoSesion(sesion) {
  const item = document.createElement("li");
  item.className = "sesion";

  const info = document.createElement("div");
  info.className = "sesion__info";

  const tema = document.createElement("p");
  tema.className = "sesion__tema";
  tema.textContent = sesion.tema;

  const fecha = document.createElement("p");
  fecha.className = "sesion__fecha";
  fecha.textContent = formatearFecha(sesion.fecha);

  info.append(tema, fecha);

  const minutos = document.createElement("span");
  minutos.className = "sesion__minutos";
  minutos.textContent = `${sesion.minutos} min`;

  item.append(info, minutos);
  return item;
}

function pintarLista() {
  const ordenadas = [...sesiones].sort((a, b) => {
    if (a.fecha !== b.fecha) {
      return a.fecha < b.fecha ? 1 : -1;
    }
    return b.id - a.id;
  });

  listaSesiones.replaceChildren(...ordenadas.map(crearElementoSesion));
  listaVacia.hidden = ordenadas.length > 0;
}

function pintar() {
  pintarRacha();
  pintarLista();
  pintarMapa();
}

function pintarMapa() {
  const mapa = document.getElementById("mapaCalor");
  const leyenda = document.getElementById("mapaLeyenda");
  const semanas = semanasDelPeriodo(hoy(), 12);
  const minutos = minutosPorDia(sesiones);

  const contenedorEtiquetas = document.createElement("div");
  contenedorEtiquetas.className = "mapa__etiquetas";
  const textosEtiqueta = ["lun", "", "mié", "", "vie", "", ""];
  for (const texto of textosEtiqueta) {
    const etiqueta = document.createElement("div");
    etiqueta.className = "mapa__etiqueta";
    etiqueta.textContent = texto;
    contenedorEtiquetas.append(etiqueta);
  }

  const grid = document.createElement("div");
  grid.className = "mapa__grid";
  for (const semana of semanas) {
    for (const fecha of semana) {
      const minutosDia = minutos[fecha] || 0;
      const celda = document.createElement("div");
      celda.className = `mapa__celda mapa__celda--nivel-${nivelDeMinutos(minutosDia)}`;
      celda.title = etiquetaTooltip(fecha, minutosDia);
      grid.append(celda);
    }
  }

  mapa.replaceChildren(contenedorEtiquetas, grid);

  const estilos = getComputedStyle(document.documentElement);
  const niveles = [
    { texto: "0", color: estilos.getPropertyValue("--celda-vacia").trim() },
    { texto: "1-29", color: estilos.getPropertyValue("--mapa-nivel-1").trim() },
    { texto: "30-59", color: estilos.getPropertyValue("--mapa-nivel-2").trim() },
    { texto: "60+", color: estilos.getPropertyValue("--mapa-nivel-3").trim() },
  ];
  const itemsLeyenda = niveles.map((nivel) => {
    const item = document.createElement("div");
    item.className = "mapa__leyenda-item";
    const color = document.createElement("span");
    color.className = "mapa__leyenda-color";
    color.style.background = nivel.color;
    const texto = document.createElement("span");
    texto.textContent = nivel.texto;
    item.append(color, texto);
    return item;
  });
  leyenda.replaceChildren(...itemsLeyenda);
}

function mostrarError(texto) {
  mensajeError.textContent = texto;
  mensajeError.hidden = false;
}

function ocultarError() {
  mensajeError.textContent = "";
  mensajeError.hidden = true;
}

if (typeof document !== "undefined") {
  const tema = temaInicial();
  aplicarTema(tema);
  actualizarBotonTema(tema);

  botonTema.addEventListener("click", () => {
    const nuevo = alternarTema();
    actualizarBotonTema(nuevo);
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const fecha = campoFecha.value;
    const tema = campoTema.value.trim();
    const minutos = Number(campoMinutos.value);

    if (!fecha) {
      mostrarError("Elige una fecha.");
      return;
    }
    if (!tema) {
      mostrarError("Escribe el tema que estudiaste.");
      return;
    }
    if (!Number.isFinite(minutos) || minutos <= 0) {
      mostrarError("Los minutos tienen que ser un número mayor que 0.");
      return;
    }

    sesiones.push({ id: Date.now(), fecha, tema, minutos });
    guardarSesiones();

    formulario.reset();
    campoFecha.value = hoy();
    ocultarError();
    pintar();
  });

  campoFecha.value = hoy();
  pintar();
}

if (typeof module !== "undefined") {
  module.exports = { nivelDeMinutos, minutosPorDia, semanasDelPeriodo, etiquetaTooltip, celdaDeDia, resolverTema, temaInicial, alternarTema };
}
