const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validarTema } = require("../app.js");

test("tema con exactamente 200 caracteres es aceptado", () => {
  const tema = "a".repeat(200);
  assert.equal(validarTema(tema), null);
});

test("tema con 201 caracteres es rechazado con mensaje en español", () => {
  const tema = "a".repeat(201);
  const error = validarTema(tema);
  assert.ok(error);
  assert.match(error, /200/);
  assert.match(error, /caracteres/i);
});

test("tema corto es aceptado", () => {
  assert.equal(validarTema("Matemáticas"), null);
});

test("tema vacío es aceptado (lo valida otra regla)", () => {
  assert.equal(validarTema(""), null);
});
