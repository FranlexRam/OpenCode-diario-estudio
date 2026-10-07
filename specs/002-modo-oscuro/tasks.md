# Tareas 002 - Modo Oscuro

## Tareas de lógica (TDD)

- [ ] **T1.** Crear `tests/tema.test.js` con tests de `resolverTema` (función pura). Casos: guardado "dark" → "dark"; guardado "light" → "light"; sin guardado + prefiereOscuro=true → "dark"; sin guardado + prefiereOscuro=false → "light". RF-2, RF-3. Hecho cuando: `node --test tests/tema.test.js` pasa 4/4. **TDD: escribir test primero, verificar que falla.**

- [ ] **T2.** Implementar `resolverTema(guardado, prefiereOscuro)` en `app.js` y exportarla. RF-2, RF-3. Hecho cuando: tests de T1 pasan 4/4. **TDD: código mínimo para verde.**

- [ ] **T3.** Tests de `temaInicial` con mock de `localStorage` y `window.matchMedia`. Casos: con guardado "dark"; con guardado "light"; sin guardado + matchMedia dark=true; sin guardado + matchMedia dark=false; sin matchMedia → "light". RF-2, RF-3. Hecho cuando: 5/5 tests pasan. **TDD: test primero.**

- [ ] **T4.** Implementar `temaInicial()` en `app.js` usando `resolverTema`. RF-2, RF-3. Hecho cuando: tests de T3 pasan 5/5. **TDD: código mínimo para verde.**

- [ ] **T5.** Tests de `alternarTema` con mock de `document.documentElement` y `localStorage`. Casos: tema actual "dark" → devuelve "light" y guarda "light"; tema actual "light" → devuelve "dark" y guarda "dark". RF-1, RF-2. Hecho cuando: 2/2 tests pasan. **TDD: test primero.**

- [ ] **T6.** Implementar `alternarTema()` en `app.js`. RF-1, RF-2. Hecho cuando: tests de T5 pasan 2/2. **TDD: código mínimo para verde.**

## Tareas de interfaz (HTML)

- [ ] **T7.** Añadir botón toggle en `index.html` dentro de `<header class="cabecera">` con `id="botonTema"`, `type="button"`, `aria-label`, icono y texto. RF-1, RNF-2. Hecho cuando: el botón es visible en la cabecera y accesible por teclado (Tab + Enter). **UI: verificado en Chrome DevTools.**

## Tareas de estilos (CSS)

- [ ] **T8.** Añadir bloque `:root[data-theme="dark"]` en `styles.css` con todas las variables oscuras (fondo, tarjeta, texto, suave, borde, sombra, fuego, fuego-oscuro, error). RF-4. Hecho cuando: con `data-theme="dark"` el fondo es oscuro y el texto claro. **UI: verificado en Chrome DevTools.**

- [ ] **T9.** Parametrizar colores fijos del CSS en variables: `--fondo-input`, `--placeholder`, `--fondo-error`, `--borde-error`, `--fondo-minutos`, `--borde-minutos`, `--celda-vacia`. Añadir sus valores oscuros en `:root[data-theme="dark"]`. RF-4. Hecho cuando: inputs, error y badges se ven correctos en modo oscuro. **UI: verificado en Chrome DevTools.**

- [ ] **T10.** Parametrizar colores del mapa de calor: `--mapa-nivel-1`, `--mapa-nivel-2`, `--mapa-nivel-3`. Añadir valores oscuros. Actualizar las reglas `.mapa__celda--nivel-*` y la leyenda en `app.js` para usar las variables. RF-4. Hecho cuando: los 4 niveles del mapa son distinguibles en modo oscuro. **UI: verificado en Chrome DevTools.**

- [ ] **T11.** Actualizar gradientes fijos: fondo del body y tarjeta de racha. En modo oscuro, usar versiones oscuras. RF-4. Hecho cuando: el gradiente superior y la tarjeta de racha se ven coherentes en oscuro. **UI: verificado en Chrome DevTools.**

- [ ] **T12.** Añadir estilos del botón toggle (`.boton-tema`): posición, fondo transparente, borde, hover, icono. RF-1, RNF-2. Hecho cuando: el botón es visible, tiene buen contraste y responde al hover. **UI: verificado en Chrome DevTools.**

## Tareas de integración

- [ ] **T13.** Implementar `actualizarBotonTema(tema)` en `app.js`: actualiza `aria-label`, icono y texto según el tema. RF-1, RNF-2. Hecho cuando: al hacer clic, el botón cambia de 🌙/Oscuro a ☀️/Claro y viceversa. **UI: verificado en Chrome DevTools.**

- [ ] **T14.** Conectar evento click del botón en `app.js`: llama a `alternarTema()` y `actualizarBotonTema()`. RF-1. Hecho cuando: clic alterna tema en toda la interfaz al instante. **UI: verificado en Chrome DevTools.**

- [ ] **T15.** Inicialización al cargar: llamar `temaInicial()`, `aplicarTema()` y `actualizarBotonTema()` dentro del bloque `if (typeof document !== "undefined")`. RF-2, RF-3. Hecho cuando: al recargar con preferencia guardada, se aplica sin parpadeo. **UI: verificado en Chrome DevTools.**

## Tareas de verificación

- [ ] **T16.** Verificación final: `node --test` (todos los tests en verde), `node --check app.js` (sintaxis correcta), validación visual en Chrome DevTools 375px con modo claro y oscuro, consola sin errores. RF-1 a RF-5, RNF-1 a RNF-4. Hecho cuando: todo verde y sin errores de consola. **Verificación: checklist completo.**
