const { test } = require("node:test");
const assert = require("node:assert/strict");
const { resolverTema, temaInicial, alternarTema } = require("../app.js");

function mockEntorno({ guardado = null, prefiereOscuro = null } = {}) {
  const datos = {};
  if (guardado !== null) {
    datos["diarioEstudio.tema"] = guardado;
  }
  global.localStorage = {
    getItem: (clave) => datos[clave] ?? null,
    setItem: (clave, valor) => { datos[clave] = String(valor); },
  };
  if (prefiereOscuro !== null) {
    global.window = {
      matchMedia: () => ({ matches: prefiereOscuro }),
    };
  } else {
    delete global.window;
  }
}

function limpiarEntorno() {
  delete global.localStorage;
  delete global.window;
}

test("guardado dark devuelve dark", () => {
  assert.equal(resolverTema("dark", false), "dark");
});

test("guardado light devuelve light", () => {
  assert.equal(resolverTema("light", true), "light");
});

test("sin guardado y prefiereOscuro true devuelve dark", () => {
  assert.equal(resolverTema(null, true), "dark");
});

test("sin guardado y prefiereOscuro false devuelve light", () => {
  assert.equal(resolverTema(null, false), "light");
});

test("temaInicial con guardado dark devuelve dark", () => {
  mockEntorno({ guardado: "dark" });
  assert.equal(temaInicial(), "dark");
  limpiarEntorno();
});

test("temaInicial con guardado light devuelve light", () => {
  mockEntorno({ guardado: "light" });
  assert.equal(temaInicial(), "light");
  limpiarEntorno();
});

test("temaInicial sin guardado y matchMedia dark devuelve dark", () => {
  mockEntorno({ prefiereOscuro: true });
  assert.equal(temaInicial(), "dark");
  limpiarEntorno();
});

test("temaInicial sin guardado y matchMedia light devuelve light", () => {
  mockEntorno({ prefiereOscuro: false });
  assert.equal(temaInicial(), "light");
  limpiarEntorno();
});

test("temaInicial sin matchMedia devuelve light", () => {
  mockEntorno();
  assert.equal(temaInicial(), "light");
  limpiarEntorno();
});

test("alternarTema con tema actual dark devuelve light y guarda light", () => {
  const atributos = { "data-theme": "dark" };
  global.document = {
    documentElement: {
      getAttribute: (nombre) => atributos[nombre] ?? null,
      setAttribute: (nombre, valor) => { atributos[nombre] = valor; },
    },
  };
  const datos = {};
  global.localStorage = {
    getItem: (clave) => datos[clave] ?? null,
    setItem: (clave, valor) => { datos[clave] = String(valor); },
  };
  const resultado = alternarTema();
  assert.equal(resultado, "light");
  assert.equal(datos["diarioEstudio.tema"], "light");
  delete global.document;
  delete global.localStorage;
});

test("alternarTema con tema actual light devuelve dark y guarda dark", () => {
  const atributos = { "data-theme": "light" };
  global.document = {
    documentElement: {
      getAttribute: (nombre) => atributos[nombre] ?? null,
      setAttribute: (nombre, valor) => { atributos[nombre] = valor; },
    },
  };
  const datos = {};
  global.localStorage = {
    getItem: (clave) => datos[clave] ?? null,
    setItem: (clave, valor) => { datos[clave] = String(valor); },
  };
  const resultado = alternarTema();
  assert.equal(resultado, "dark");
  assert.equal(datos["diarioEstudio.tema"], "dark");
  delete global.document;
  delete global.localStorage;
});
