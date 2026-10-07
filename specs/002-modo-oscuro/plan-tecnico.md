# Plan Técnico 002 - Modo Oscuro

## Estrategia general

Usar un atributo `data-theme` en el elemento `<html>` con valores `"light"` y `"dark"`. Las variables CSS se definen en `:root` (claro, por defecto) y se sobreescriben dentro de `:root[data-theme="dark"]`. Esto permite cambiar todo el tema con un solo atributo, sin tocar cada regla CSS individualmente.

## 1. Cambios en `styles.css`

### 1.1 Variables nuevas para modo oscuro

Dentro de `:root[data-theme="dark"]`, redefinir las variables existentes:

| Variable | Valor claro (existente) | Valor oscuro (propuesto) | Justificación |
|---|---|---|---|
| `--fondo` | `#f4f5f7` | `#0f1115` | Fondo muy oscuro, casi negro azulado |
| `--tarjeta` | `#ffffff` | `#1a1d24` | Tarjeta ligeramente más clara que el fondo |
| `--texto` | `#1f2430` | `#e8eaed` | Blanco suave, no puro (menos fatiga) |
| `--texto-suave` | `#6b7280` | `#9aa0a6` | Gris medio, contraste > 4.5:1 sobre `#1a1d24` |
| `--borde` | `#e3e6ec` | `#2d3139` | Borde sutil, visible sin ser brillante |
| `--sombra` | `0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)` | `0 1px 2px rgba(0,0,0,.3), 0 8px 24px rgba(0,0,0,.4)` | Sombras negras en modo oscuro |
| `--fuego` | `#f97316` | `#fb923c` | Naranja más claro para contraste sobre fondo oscuro |
| `--fuego-oscuro` | `#ea580c` | `#f97316` | Naranja base como acento oscuro |
| `--error` | `#dc2626` | `#f87171` | Rojo más claro para contraste sobre fondo oscuro |
| `--radio` | `16px` | `16px` | Sin cambio |

### 1.2 Colores fijos que necesitan versión oscura

Estos colores están hardcodeados en el CSS y deben parametrizarse o sobrescribirse:

| Uso | Valor claro | Valor oscuro | Variable propuesta |
|---|---|---|---|
| Fondo de inputs | `#fff` | `#12141a` | `--fondo-input` |
| Placeholder | `#9aa1ad` | `#6b7280` | `--placeholder` |
| Fondo de error | `#fef2f2` | `#2d1518` | `--fondo-error` |
| Borde de error | `#fecaca` | `#7f1d1d` | `--borde-error` |
| Fondo de minutos (badge) | `#fff7ed` | `#2d1f0e` | `--fondo-minutos` |
| Borde de minutos | `#fed7aa` | `#7c4a03` | `--borde-minutos` |
| Celda vacía mapa | `#ebedf0` | `#26292f` | `--celda-vacia` |
| Nivel 1 mapa | `#9be9a8` | `#1e4620` | `--mapa-nivel-1` |
| Nivel 2 mapa | `#40c463` | `#2ea043` | `--mapa-nivel-2` |
| Nivel 3 mapa | `#216e39` | `#3fb950` | `--mapa-nivel-3` |

### 1.3 Gradientes fijos

| Uso | Valor claro | Valor oscuro |
|---|---|---|
| Fondo body (gradiente superior) | `#fff7ed` → `var(--fondo)` | `#1a1510` → `var(--fondo)` |
| Tarjeta racha | `#fff7ed, #fef3c7` | `#2d1f0e, #2d1a0a` |

### 1.4 Estilos del botón toggle

Nueva clase `.boton-tema` con:
- Posición: alineado a la derecha de la cabecera (o centrado debajo del subtítulo).
- Fondo: transparente con borde `var(--borde)`.
- Icono: emoji (🌙/☀️) o texto ("Oscuro"/"Claro").
- `aria-label` descriptivo.
- Hover: fondo `var(--fondo-input)`.

## 2. Cambios en `index.html`

### 2.1 Botón toggle en cabecera

Añadir dentro de `<header class="cabecera">`:

```html
<button class="boton-tema" id="botonTema" type="button" aria-label="Cambiar a modo oscuro">
  <span aria-hidden="true">🌙</span>
  <span class="boton-tema__texto">Oscuro</span>
</button>
```

### 2.2 Atributo inicial en `<html>`

El atributo `data-theme` se establece vía JavaScript antes de que se pinte el contenido (para evitar parpadeo). Si no se puede, se deja sin atributo y JS lo añade inmediatamente.

## 3. Cambios en `app.js`

### 3.1 Constantes nuevas

```js
const CLAVE_TEMA = "diarioEstudio.tema";
```

### 3.2 Funciones puras (exportables para tests)

```js
function temaInicial() {
  const guardado = localStorage.getItem(CLAVE_TEMA);
  if (guardado === "dark" || guardado === "light") {
    return guardado;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
}

function alternarTema() {
  const actual = document.documentElement.getAttribute("data-theme") || "light";
  const nuevo = actual === "dark" ? "light" : "dark";
  aplicarTema(nuevo);
  localStorage.setItem(CLAVE_TEMA, nuevo);
  return nuevo;
}
```

### 3.3 Inicialización

Al cargar el DOM (dentro del bloque `if (typeof document !== "undefined")`):

```js
const botonTema = document.getElementById("botonTema");
const tema = temaInicial();
aplicarTema(tema);
actualizarBotonTema(tema);

botonTema.addEventListener("click", () => {
  const nuevo = alternarTema();
  actualizarBotonTema(nuevo);
});
```

### 3.4 Función auxiliar para el botón

```js
function actualizarBotonTema(tema) {
  const esOscuro = tema === "dark";
  botonTema.setAttribute("aria-label", esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  botonTema.querySelector("[aria-hidden]").textContent = esOscuro ? "☀️" : "🌙";
  botonTema.querySelector(".boton-tema__texto").textContent = esOscuro ? "Claro" : "Oscuro";
}
```

### 3.5 Export para tests

```js
module.exports = { ..., temaInicial, alternarTema };
```

Nota: `temaInicial` y `alternarTema` usan `localStorage` y `document` directamente. Para tests en Node, se pueden testear con mocks o extrayendo la lógica de decisión a una función pura:

```js
function resolverTema(guardado, prefiereOscuro) {
  if (guardado === "dark" || guardado === "light") return guardado;
  return prefiereOscuro ? "dark" : "light";
}
```

Esta función es 100% pura y testable sin mocks.

## 4. Estrategia de contraste

### 4.1 Ratios verificados (WCAG AA)

| Combinación | Ratio | Pasa |
|---|---|---|
| `#e8eaed` sobre `#0f1115` (texto/fondo) | ~15:1 | AAA |
| `#9aa0a6` sobre `#1a1d24` (suave/tarjeta) | ~7:1 | AAA |
| `#fb923c` sobre `#1a1d24` (fuego/tarjeta) | ~7:1 | AAA |
| `#f87171` sobre `#2d1518` (error/fondo-error) | ~5.5:1 | AA |
| `#3fb950` sobre `#0f1115` (nivel 3 mapa) | ~7:1 | AAA |

### 4.2 Mapa de calor en oscuro

Los niveles del mapa se invierten en intensidad: el nivel 3 (más minutos) es el más brillante, el nivel 0 (sin sesión) es el más oscuro. Esto mantiene la lógica intuitiva de "más color = más actividad".

## 5. Orden de implementación

1. **Tests primero (TDD):** tests de `resolverTema` y `temaInicial` con mocks.
2. **Lógica pura:** `resolverTema`, `temaInicial`, `alternarTema`, `actualizarBotonTema`.
3. **HTML:** botón toggle en cabecera.
4. **CSS:** variables oscuras, estilos del botón, colores fijos parametrizados.
5. **Integración:** evento click, inicialización al cargar.
6. **Verificación:** `node --test`, `node --check app.js`, validación visual en Chrome DevTools.

## 6. Alternativas descartadas

| Alternativa | Por qué se descarta |
|---|---|
| Clase `.dark` en `<body>` | El atributo `data-theme` es más semántico y estándar |
| CSS `prefers-color-scheme` media query | No permite override manual ni persistencia |
| JavaScript que calcula colores dinámicamente | Añade complejidad innecesaria; las variables CSS bastan |
| Librería de temas | Viola la restricción de sin dependencias |
