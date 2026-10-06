# Constitución del Diario de Estudio

## Principios innegociables

1. **Stack mínimo.** Tres archivos planos (index.html, styles.css, app.js), sin frameworks, bundlers ni dependencias. Se verifica con `ls`: no hay package.json ni node_modules.
2. **La spec manda.** Ningún cambio de funcionalidad entra al código sin spec aprobada en specs/NNN-nombre/. La spec describe el QUÉ; el plan y las tareas derivan de ella.
3. **Lógica separada de interfaz.** Fechas, racha y almacenamiento viven en funciones puras sin tocar el DOM; la interfaz solo pinta y captura eventos.
4. **Doble verificación.** Funciones puras con node --test; tras cada cambio, Chrome DevTools: consola sin errores y vista móvil de 375 px.
5. **Datos del usuario protegidos.** Todo en localStorage (clave `diarioEstudio.sesiones`, formato `{id, fecha, tema, minutos}`). Sin red, sin cuentas, sin terceros.
6. **Español en todo.** Identificadores, mensajes, docs e interfaz en español. Fechas siempre en hora local (getFullYear/getMonth/getDate), nunca UTC.
