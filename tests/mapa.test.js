const test = require("node:test");
const assert = require("node:assert");
const { nivelDeMinutos, minutosPorDia, semanasDelPeriodo, etiquetaTooltip, celdaDeDia } = require("../app.js");

test("nivelDeMinutos: 0 minutos → nivel 0", () => {
  assert.strictEqual(nivelDeMinutos(0), 0);
});

test("nivelDeMinutos: 0.5 minutos → nivel 1", () => {
  assert.strictEqual(nivelDeMinutos(0.5), 1);
});

test("nivelDeMinutos: 1 minuto → nivel 1", () => {
  assert.strictEqual(nivelDeMinutos(1), 1);
});

test("nivelDeMinutos: 29 minutos → nivel 1", () => {
  assert.strictEqual(nivelDeMinutos(29), 1);
});

test("nivelDeMinutos: 30 minutos → nivel 2", () => {
  assert.strictEqual(nivelDeMinutos(30), 2);
});

test("nivelDeMinutos: 59 minutos → nivel 2", () => {
  assert.strictEqual(nivelDeMinutos(59), 2);
});

test("nivelDeMinutos: 60 minutos → nivel 3", () => {
  assert.strictEqual(nivelDeMinutos(60), 3);
});

test("nivelDeMinutos: 100 minutos → nivel 3", () => {
  assert.strictEqual(nivelDeMinutos(100), 3);
});

test("minutosPorDia: suma sesiones del mismo día", () => {
  const sesiones = [
    { id: 1, fecha: "2026-10-05", tema: "Matemáticas", minutos: 30 },
    { id: 2, fecha: "2026-10-05", tema: "Física", minutos: 20 },
  ];
  assert.deepStrictEqual(minutosPorDia(sesiones), { "2026-10-05": 50 });
});

test("minutosPorDia: ignora sesiones de otros días", () => {
  const sesiones = [
    { id: 1, fecha: "2026-10-04", tema: "Historia", minutos: 15 },
    { id: 2, fecha: "2026-10-05", tema: "Matemáticas", minutos: 30 },
  ];
  assert.deepStrictEqual(minutosPorDia(sesiones), { "2026-10-04": 15, "2026-10-05": 30 });
});

test("minutosPorDia: array vacío → objeto vacío", () => {
  assert.deepStrictEqual(minutosPorDia([]), {});
});

test("minutosPorDia: varios días con varias sesiones cada uno", () => {
  const sesiones = [
    { id: 1, fecha: "2026-10-03", tema: "A", minutos: 10 },
    { id: 2, fecha: "2026-10-03", tema: "B", minutos: 25 },
    { id: 3, fecha: "2026-10-05", tema: "C", minutos: 40 },
    { id: 4, fecha: "2026-10-05", tema: "D", minutos: 5 },
    { id: 5, fecha: "2026-10-05", tema: "E", minutos: 15 },
  ];
  assert.deepStrictEqual(minutosPorDia(sesiones), {
    "2026-10-03": 35,
    "2026-10-05": 60,
  });
});

test("semanasDelPeriodo: devuelve 12 semanas de 7 días", () => {
  const semanas = semanasDelPeriodo("2026-10-05", 12);
  assert.strictEqual(semanas.length, 12);
  for (const semana of semanas) {
    assert.strictEqual(semana.length, 7);
  }
});

test("semanasDelPeriodo: cada semana empieza en lunes", () => {
  const semanas = semanasDelPeriodo("2026-10-05", 12);
  for (const semana of semanas) {
    const [anio, mes, dia] = semana[0].split("-").map(Number);
    assert.strictEqual(new Date(anio, mes - 1, dia).getDay(), 1);
  }
});

test("semanasDelPeriodo: la última semana contiene a hoy", () => {
  const semanas = semanasDelPeriodo("2026-10-05", 12);
  const ultima = semanas[semanas.length - 1];
  assert.ok(ultima.includes("2026-10-05"));
});

test("semanasDelPeriodo: fechas consecutivas", () => {
  const semanas = semanasDelPeriodo("2026-10-05", 12);
  const todas = semanas.flat();
  for (let i = 1; i < todas.length; i++) {
    const [a1, m1, d1] = todas[i - 1].split("-").map(Number);
    const [a2, m2, d2] = todas[i].split("-").map(Number);
    assert.strictEqual(Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1), 86400000);
  }
});

test("semanasDelPeriodo: cruce de año dic→ene", () => {
  const semanas = semanasDelPeriodo("2026-01-05", 12);
  const todas = semanas.flat();
  assert.ok(todas.includes("2026-01-05"));
  assert.ok(todas.some((f) => f.startsWith("2025-12")));
  assert.ok(todas.some((f) => f.startsWith("2026-01")));
});

test("etiquetaTooltip: 0 minutos → Sin sesión", () => {
  assert.strictEqual(etiquetaTooltip("2026-10-05", 0), "Sin sesión");
});

test("etiquetaTooltip: 45 minutos → 45 min", () => {
  assert.strictEqual(etiquetaTooltip("2026-10-05", 45), "45 min");
});

test("celdaDeDia: 0 minutos → nivel 0", () => {
  assert.deepStrictEqual(celdaDeDia("2026-10-05", 0), {
    fecha: "2026-10-05",
    minutos: 0,
    nivel: 0,
  });
});

test("celdaDeDia: 45 minutos → nivel 2", () => {
  assert.deepStrictEqual(celdaDeDia("2026-10-05", 45), {
    fecha: "2026-10-05",
    minutos: 45,
    nivel: 2,
  });
});

test("celdaDeDia: 90 minutos → nivel 3", () => {
  assert.deepStrictEqual(celdaDeDia("2026-10-05", 90), {
    fecha: "2026-10-05",
    minutos: 90,
    nivel: 3,
  });
});
