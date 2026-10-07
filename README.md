# Diario de Estudio

Aplicación web minimalista y accesible para el registro y seguimiento de sesiones de estudio con cálculo de rachas y mapa de calor de actividad anual.

Desarrollada bajo una arquitectura estricta de **cero dependencias** mediante la orquestación de un **Sistema Multiagente (MAS)** en OpenCode y guiada por desarrollo orientado a especificaciones (SDD) y TDD.

---

## 🎯 Características

- **Registro de sesiones:** Fecha, tema y tiempo dedicado (minutos).
- **Control de racha:** Racha actual consecutiva y récord histórico.
- **Mapa de calor anual:** Visualización de actividad estilo GitHub con 4 niveles de intensidad.
- **Modo Oscuro accesible:** Detección automática del sistema operativo (`prefers-color-scheme`), toggle manual en cabecera y persistencia en `localStorage`.
- **Seguridad y saneamiento:** Construcción segura del DOM (`createElement` / `textContent`) contra inyecciones XSS y validación de longitud máxima en inputs auditada con la skill `security-and-hardening`.
- **Diseño responsive:** Optimizado para dispositivos móviles (validado desde 375 px) y escritorio sin frameworks CSS.

---

## 🛠️ Arquitectura y Restricciones Técnicas

El proyecto sigue una constitución estricta definida en `docs/constitution.md`:
- **3 archivos base:** `index.html`, `styles.css` y `app.js`.
- **Cero dependencias de producción:** Sin frameworks (Vanilla JavaScript, HTML5 semántico, CSS puro con custom properties).
- **Ejecución local inmediata:** Compatible con apertura directa en navegador vía `file://` o servidor estático.
- **TDD estricto:** 37 pruebas unitarias con el runner nativo de Node.js (`node --test`).

---

## 🤖 Orquestación Multiagente (MAS)

El desarrollo del proyecto se ejecutó mediante agentes especializados definidos en `AGENTS.md`:

| Rol | Función |
|---|---|
| **Coordinator** | Orquesta el flujo de estados (`INICIO`, `PLANIFICADO`, `EN_PROGRESO`, `EN_REVISION`, `APROBADO`) y sincroniza `MEMORY.md`. |
| **Planner** | Redacta especificaciones formales en sintaxis EARS y planes técnicos atómicos en `specs/`. |
| **Implementer** | Ejecuta código bajo ciclo TDD (escribe tests en rojo y refactoriza a verde). |
| **Reviewer** | Valida calidad de código, criterios de aceptación, pruebas visuales en Chrome DevTools y auditorías de seguridad. |

### Skills Integradas (`skills.sh`)
- `security-and-hardening` (Addy Osmani): Directivas de sanitización de entradas, prevención de XSS y buenas prácticas en frontend.

---

## 🚀 Instalación y Pruebas

### Ejecutar la aplicación
Basta con abrir `index.html` con doble clic en cualquier navegador web o servir el directorio.

### Ejecutar la suite de pruebas unitarias
```bash
node --test


Verificar sintaxis de JavaScript
Bash
node --check app.js


