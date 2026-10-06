# Plan 001 - Mapa de calor

## Archivos a modificar

- `index.html` — nueva tarjeta entre la racha y el formulario: título,
  contenedor del mapa (`id="mapaCalor"`) y leyenda (`id="mapaLeyenda"`).
- `styles.css` — tarjeta del mapa, cuadrícula 12×7, 4 niveles de color + gris,
  leyenda, etiquetas de días, responsive 375 px.
- `app.js` — funciones puras de cálculo + `pintarMapa()` + llamada desde
  `pintar()` y desde el `submit` (RF-7).

## Funciones puras (todas con "hoy" como parámetro)

- `nivelDeMinutos(minutos)` → 0|1|2|3. Comparaciones numéricas: ≤0→0,
  <30→1, <60→2, ≥60→3. Así los decimales (0.5) caen en nivel 1 sin huecos.
- `minutosPorDia(sesiones)` → `{fechaISO: minutos}`. Suma los minutos de las
  sesiones que comparten fecha (RF-3). Array vacío → objeto vacío.
- `semanasDelPeriodo(hoy, numSemanas)` → array de semanas; cada semana es un
  array de 7 fechas ISO (lunes a domingo). La última semana contiene a `hoy`.
  Devuelve 12 semanas × 7 días = 84 fechas consecutivas.
- `celdaDeDia(fechaISO, minutosHoy)` → `{fecha, minutos, nivel}`.
- `etiquetaTooltip(fechaISO, minutos)` → "Sin sesión" o "X min" (RF-5).

## Decisiones técnicas (con alternativas descartadas)

1. **Niveles con comparaciones numéricas** (<30, <60) en vez de rangos
   enteros: evita el hueco de minutos decimales y es más simple.
   Descartado: redondear minutos (altera datos del usuario).
2. **Semana actual incluida en las 12** (no 12 + 1): la última columna es la
   semana de hoy, con los días futuros en gris para mantener la cuadrícula
   rectangular 12×7. Descartado: 12 semanas completas + actual parcial
   (13 columnas, rompe RF-1/CF-1).
3. **Días futuros de la semana actual en gris** (igual que sin sesión):
   cuadrícula siempre rectangular, sin casos especiales de dibujo.
   Descartado: no dibujarlos (columna irregular, más lógica).
4. **Objeto `minutosPorDia` calculado una vez** y reutilizado por las 84
   celdas. Descartado: recorrer sesiones en cada celda (O(84×n)).
5. **Tooltip nativo con atributo `title`**: cero JS extra, accesible.
   Descartado: tooltip custom (más código y más fallos).
6. **Grid CSS con 7 filas fijas**; ancho de celda = (contenedor − padding) /
   12, sin scroll horizontal en 375 px (RNF-1). Descartado: tabla semántica
   (menos control del estilo GitHub).
7. **Etiquetas de días reducidas a 3** (lun, mié, vie) para ahorrar ancho en
   móvil. Descartado: las 7 (demasiado denso en 375 px).
8. **Sin etiquetas de mes**: el tooltip (RF-5) ya da la fecha exacta.
   Descartado: mostrar el mes al cambio de columna (ruido visual).
9. **Colores: 4 verdes GitHub** (#ebedf0, #9be9a8, #40c463, #216e39) con
   luminosidad creciente para distinguirse en escala de grises (RNF-2).
   Descartado: gradiente continuo (niveles poco distinguibles).
10. **Lógica protegida para test**: el código que toca el DOM se envuelve en
    `if (typeof document !== "undefined")` y las funciones puras se exportan
    con `if (typeof module !== "undefined")`. Así `node --test` puede
    importarlas sin ejecutar el DOM. Descartado: archivo de lógica separado
    (rompe el principio de 3 archivos).

## Estrategia de tests (node --test)

- Archivo: `tests/mapa.test.js` (node --test es built-in; sin dependencias.
  El sitio sigue siendo 3 archivos; el test no se abre con doble clic).
- Importa las funciones puras desde `app.js` vía `module.exports` condicional.
- Casos:
  - `nivelDeMinutos`: 0→0, 0.5→1, 1→1, 29→1, 30→2, 59→2, 60→3, 100→3.
  - `minutosPorDia`: suma sesiones del mismo día; ignora otros días; vacío→{}.
  - `semanasDelPeriodo`: 12 semanas × 7 días; empieza en lunes; la última
    contiene a `hoy`; fechas consecutivas; cruce de año (dic→ene).
  - `etiquetaTooltip`: 0→"Sin sesión"; 45→"45 min".
- Verificación manual tras implementar (CF-7): Chrome DevTools, consola sin
  errores, móvil 375 px, añadir sesión actualiza el mapa.
