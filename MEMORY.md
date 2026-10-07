# MEMORY.md

## Estado del proyecto

**v1.1 — funcionando.** Registro de sesiones de estudio, racha actual, mejor racha histórica y persistencia en localStorage.

**v1.2 — SDD.** Creada `docs/constitution.md` con 6 principios innegociables (stack, spec-código, separación, tests, datos, idioma).

**Spec 001 — Mapa de calor (aprobada).** 12 semanas, 4 niveles fijos (0/1-29/30-59/60+), celdas vacías en gris, tarjeta propia, tooltip con minutos, leyenda. Archivo: `specs/001-mapa-calor/spec.md`.

**Plan 001 — aprobado.** Funciones puras con "hoy" como parámetro, niveles por comparaciones numéricas, semana actual dentro de las 12, tests con node --test en `tests/mapa.test.js`. Archivo: `specs/001-mapa-calor/plan.md`.

**Tareas 001 — aprobadas.** 14 tareas (T1-T14): lógica pura y tests (T1-T9), interfaz (T10-T13), verificación final (T14). Archivo: `specs/001-mapa-calor/tasks.md`.

**T1, T2 y T9 hechas.** `nivelDeMinutos` implementada y testeada (8/8 verde). `app.js` reestructurado con guard DOM + export condicional. Verificado: consola sin errores.

**T3-T8 hechas.** Todas las funciones puras implementadas y testeadas (22/22 verde acumulado). Lógica pura completa.

**T10-T13 hechas.** Tarjeta HTML, estilos CSS, `pintarMapa()` e integrazión completas. Verificado: añadir sesión actualiza el mapa al instante (celda gris → nivel 2, tooltip "45 min").

**Spec 001 — FINALIZADA CON ÉXITO (2026-10-06).** Mapa de calor implementado: 12 semanas, 4 niveles, leyenda, tooltip. 22/22 tests verde, veredicto RF/RNF aprobado en Chrome DevTools 375px. Estado en spec.md: `implementada`.

**Spec 002 — Modo Oscuro (APROBADA 2026-10-06).** Botón toggle en cabecera, persistencia en localStorage (`diarioEstudio.tema`), detección de `prefers-color-scheme`, variables CSS `:root[data-theme="dark"]`, contraste WCAG AA. 33/33 tests verde, veredicto APROBADO, validación visual del usuario confirmada. Archivo: `specs/002-modo-oscuro/spec.md`.

**Auditoría de seguridad (2026-10-06).** VISTO BUENO con observaciones menores. XSS/DOM: OK (createElement/textContent, sin innerHTML). Corrección aplicada: `maxlength="200"` en input tema + `validarTema()` en app.js + 4 tests en `tests/tema-longitud.test.js`. 37/37 tests verde, corrección APROBADA por reviewer.

## Archivos

- `index.html` — estructura: cabecera, tarjeta de racha, formulario, lista de sesiones.
- `styles.css` — diseño responsive, tarjetas, gradientes, móvil primero.
- `app.js` — lógica: formulario, racha, lista, localStorage.

## Funcionalidades implementadas

- Formulario: fecha (hoy por defecto, editable), tema (obligatorio), minutos (> 0, obligatorio).
- Validación propia en español con `novalidate`.
- Racha actual en grande con 🔥 (días consecutivos con sesión, terminando hoy o ayer).
- Mejor racha histórica (secuencia más larga de días consecutivos con sesión, mostrada siempre).
- Lista de sesiones ordenada de más reciente a más antigua.
- Persistencia en localStorage (clave `diarioEstudio.sesiones`).

## Decisiones pendientes de revisión por el usuario

- Línea motivacional bajo la racha (¿mantener o quitar?).
- No hay borrado ni edición de sesiones (no pedido todavía).
- Formato de fechas con arrays propios (sin depender del locale del navegador).

## Próximos pasos sugeridos

- Posible v2: borrado/edición de sesiones, estadísticas simples.

## Decisiones de v1.1

- Mejor racha siempre visible (empieza en 0).
- Solo muestra el número de días, sin fecha.
- Colocada debajo de la racha actual en la misma tarjeta.
