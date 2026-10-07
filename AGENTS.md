# AGENTS.md

Sitio estático sin build: `index.html`, `styles.css`, `app.js`. Se abre con doble clic en `index.html` (file://), sin servidor ni dependencias.

## Sistema Multiagente (MAS)

Cuatro agentes con roles estrictos. Ningún agente puede saltarse su rol ni modificar archivos fuera de sus responsabilidades permitidas.

### Agentes

| Agente | Rol | Responsabilidades | Archivos permitidos |
|---|---|---|---|
| **coordinator** | Orquestador general y único punto de contacto con el usuario | Asigna tareas, gestiona el flujo, actualiza MEMORY.md, reporta al usuario | `MEMORY.md`, `AGENTS.md` |
| **planner** | Diseña la solución | Redacta specs (EARS), plan técnico y tasks.md | `specs/**`, `tasks.md` |
| **implementer** | Desarrolla atómicamente | TDD estricto con `node --test`, sin tocar arquitectura | `index.html`, `styles.css`, `app.js`, `tests/**` |
| **reviewer** | Audita y valida | Revisa tests, valida visualmente en Chrome DevTools (375 px y consola limpia). Tiene poder de veto | Solo lectura |

### Protocolo de traspaso (handoff)

Cada transición entre agentes requiere un entregable verificable:

- **coordinator → planner:** descripción del problema o feature solicitada.
- **planner → coordinator:** spec (EARS), plan técnico y `tasks.md` listos para aprobación.
- **coordinator → implementer:** tarea atómica específica del `tasks.md` aprobado.
- **implementer → reviewer:** tarea completada con tests pasando (`node --test` sin errores).
- **reviewer → implementer:** lista de fallos concretos (solo si hay veto).
- **reviewer → coordinator:** aprobación final con resumen de validación.

### Máquina de estados del flujo de trabajo

```
INICIO → PLANIFICADO → EN_PROGRESO → EN_REVISION → APROBADO
                      ↑                        │
                      └────── RETRABAJO ←──────┘
```

| Estado | Significado | Transición |
|---|---|---|
| **INICIO** | coordinator recibe la solicitud del usuario | coordinator asigna a planner |
| **PLANIFICADO** | planner entrega spec/plan a coordinator | coordinator aprueba y asigna a implementer |
| **EN_PROGRESO** | implementer desarrolla tareas atómicas con TDD | implementer concluye y entrega a reviewer |
| **EN_REVISION** | reviewer audita tests y valida visualmente | reviewer aprueba (→ APROBADO) o rechaza (→ RETRABAJO) |
| **RETRABAJO** | reviewer rechaza con lista de fallos | implementer corrige y vuelve a EN_REVISION |
| **APROBADO** | reviewer aprueba | coordinator actualiza MEMORY.md y reporta al usuario |

### Regla transversal innegociable

**Ningún agente puede saltarse su rol ni modificar archivos fuera de sus responsabilidades permitidas.**

## Restricciones del proyecto

- Solo tres archivos de app. No añadir frameworks, librerías, bundler ni tests automáticos fuera de `tests/**`.
- Todos los textos de la interfaz en español.
- Sin comentarios en el código.

## Verificación

No hay lint ni typecheck. Para verificar cambios:

```bash
node --check app.js   # sintaxis
node --test           # tests (cuando existan)
```

La lógica de fechas y racha se puede probar en Node extrayendo las funciones puras (`hoy`, `moverDia`, `calcularRacha`, `calcularMejorRacha`) sin DOM.

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
