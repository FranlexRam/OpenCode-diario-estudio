# AGENTS.md

Sitio estático sin build: `index.html`, `styles.css`, `app.js`. Se abre con doble clic en `index.html` (file://), sin servidor ni dependencias.

## Restricciones del proyecto

- Solo tres archivos. No añadir frameworks, librerías, bundler ni tests automáticos.
- Todos los textos de la interfaz en español.
- Sin comentarios en el código.

## Verificación

No hay tests automáticos todavía. Después de cada cambio visual o funcional, verifica con el MCP de Chrome DevTools: abre index.html, prueba la funcionalidad, revisa la consola y comprueba la vista móvil de 375 px.

## Memoria

- Al empezar cada sesión, lee `MEMORY.md` para conocer el estado actual del proyecto.
- Al terminar cada tarea, actualiza `MEMORY.md` con los cambios realizados.
- Mantén `MEMORY.md` en un máximo de ~50 líneas.

## Puntos críticos

- **Fechas siempre en local, nunca UTC.** Usar `getFullYear()/getMonth()/getDate()`. `toISOString()` o `toLocaleDateString()` con offset rompen la racha en zonas horarias negativas.
- **Clave de localStorage:** `diarioEstudio.sesiones` (array de `{id, fecha, tema, minutos}`). Cambiar el formato invalida datos ya guardados.
- **Regla de racha:** días consecutivos con al menos una sesión, terminando hoy; si hoy no hay sesión pero ayer sí, la racha sigue viva.
- **Mejor racha:** secuencia más larga de días consecutivos con sesión, independiente de si termina hoy. Se muestra siempre (empieza en 0).
- **Validación:** el formulario usa `novalidate` con mensajes propios en español (no depender de los del navegador).
- **DOM:** la lista se construye con `createElement`/`replaceChildren`, nunca con `innerHTML` interpolando datos del usuario.
