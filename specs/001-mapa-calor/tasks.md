# Tareas 001 - Mapa de calor

## Lógica pura y tests

- [x] T1. Crear `tests/mapa.test.js` con los casos de `nivelDeMinutos` (0→0,
  0.5→1, 1→1, 29→1, 30→2, 59→2, 60→3, 100→3). RF-2.
  Hecho cuando: `node --test tests/` existe y los casos están en rojo (aún no
  hay función).

- [x] T2. Implementar `nivelDeMinutos(minutos)` en `app.js` con comparaciones
  numéricas (≤0→0, <30→1, <60→2, ≥60→3). RF-2.
  Hecho cuando: `node --test tests/` pasa los casos de T1 en verde.

- [x] T3. Añadir a `tests/mapa.test.js` los casos de `minutosPorDia`: suma
  sesiones del mismo día, ignora otros días, array vacío → objeto vacío. RF-3.
  Hecho cuando: los casos están en rojo.

- [x] T4. Implementar `minutosPorDia(sesiones)` en `app.js`. RF-3.
  Hecho cuando: `node --test tests/` pasa los casos de T3 en verde.

- [x] T5. Añadir a `tests/mapa.test.js` los casos de `semanasDelPeriodo`:
  12 semanas × 7 días, empieza en lunes, la última contiene a `hoy`, fechas
  consecutivas, cruce de año (dic→ene). RF-1.
  Hecho cuando: los casos están en rojo.

- [x] T6. Implementar `semanasDelPeriodo(hoy, numSemanas)` en `app.js`.
  RF-1.
  Hecho cuando: `node --test tests/` pasa los casos de T5 en verde.

- [x] T7. Añadir a `tests/mapa.test.js` los casos de `etiquetaTooltip`:
  0→"Sin sesión", 45→"45 min". RF-5.
  Hecho cuando: los casos están en rojo.

- [x] T8. Implementar `celdaDeDia(fechaISO, minutosHoy)` y
  `etiquetaTooltip(fechaISO, minutos)` en `app.js`. RF-5.
  Hecho cuando: `node --test tests/` pasa los casos de T7 en verde.

- [x] T9. Proteger el código DOM de `app.js` con
    `if (typeof document !== "undefined")` y exportar las funciones puras con
    `if (typeof module !== "undefined")`. RF-1, RF-2, RF-3, RF-5.
    Hecho cuando: `node --test tests/` sigue en verde tras la reestructuración.

## Interfaz

- [x] T10. Añadir a `index.html` la tarjeta del mapa entre la racha y el
  formulario: título, `<div id="mapaCalor">` y `<div id="mapaLeyenda">`.
  RF-8.
  Hecho cuando: la tarjeta aparece en el DOM entre la racha y el formulario.

- [x] T11. Crear en `styles.css` la cuadrícula 12×7, los 4 niveles de color +
  gris, la leyenda y las etiquetas de días (lun, mié, vie). RNF-1, RNF-2.
  Hecho cuando: el mapa se ve en móvil 375 px sin scroll horizontal y los
  niveles se distinguen en escala de grises.

- [x] T12. Implementar `pintarMapa()` en `app.js`: construye las 84 celdas con
  `createElement`, aplica niveles, tooltip y leyenda. RF-1, RF-2, RF-4, RF-5,
  RF-6.
  Hecho cuando: el mapa muestra 12 semanas con colores correctos, días sin
  sesión en gris, tooltip con minutos y leyenda visible.

- [x] T13. Llamar `pintarMapa()` desde `pintar()` y desde el evento `submit`.
  RF-7.
  Hecho cuando: añadir una sesión actualiza el mapa al instante sin recargar.

## Verificación final

- [x] T14. Verificación manual en Chrome DevTools: consola sin errores, móvil
  375 px, añadir sesión actualiza el mapa, tooltip funciona. CF-7.
  Hecho cuando: todo lo anterior se comprueba en el navegador.
