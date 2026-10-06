# Spec 001 - Mapa de calor

Estado: implementada

## Contexto y objetivo

El Diario registra sesiones con fecha, tema y minutos, pero la vista actual
(racha + lista) no muestra de un vistazo el patrón de estudio en el tiempo.
El objetivo es un mapa de calor tipo GitHub que, con una sola mirada, revele
qué días se estudió y cuánto durante las últimas 12 semanas, para hacer visible
la constancia (o su ausencia) y reforzar el hábito.

## Usuarios

- Usuario único: la misma persona que registra sus sesiones. Sin cuentas ni otros roles.

## Historias de usuario

- HU-1. Como estudiante, quiero ver un mapa de calor de mis últimas 12 semanas
  para saber de un vistazo qué días estudié y cuánto.
- HU-2. Como estudiante, quiero que los días con más minutos se vean más
  intensos para identificar mis mejores jornadas.
- HU-3. Como estudiante, quiero ver los días sin sesión en gris para ser
  consciente de los huecos en mi constancia.
- HU-4. Como estudiante, quiero conocer los minutos exactos de un día al pasar
  cursor sobre su celda.

## Requisitos funcionales (EARS)

- RF-1. EL SISTEMA mostrará un mapa de calor con las últimas 12 semanas,
  organizado en columnas (semanas) y filas (días de la semana), con la semana
  actual a la derecha.
- RF-2. EL SISTEMA coloreará cada día según sus minutos acumulados, con 4
  niveles fijos: 0 min (gris, sin sesión), 1-29 min, 30-59 min, 60+ min.
- RF-3. CUANDO un día tiene varias sesiones, EL SISTEMA sumará sus minutos
  para determinar el nivel.
- RF-4. EL SISTEMA mostrará los días sin sesión como celdas vacías en gris.
- RF-5. CUANDO el usuario pase el cursor sobre una celda, EL SISTEMA mostrará
  los minutos exactos de ese día (o "Sin sesión").
- RF-6. EL SISTEMA mostrará una leyenda bajo el mapa con los 4 niveles y sus
  umbrales de minutos.
- RF-7. CUANDO el usuario añade una sesión, EL SISTEMA actualizará el mapa
  sin recargar la página.
- RF-8. EL SISTEMA colocará el mapa en su propia tarjeta, entre la tarjeta de
  racha y el formulario de nueva sesión.

## Requisitos no funcionales

- RNF-1. El mapa será legible en móvil de 375 px sin scroll horizontal.
- RNF-2. Los niveles deben distinguirse aunque el color se perciba en escala
  de grises (no depender solo del tono).
- RNF-3. El texto de las celdas (minutos, fechas) se insertará como texto,
  nunca como HTML interpretado.

## Casos límite

- CL-1. Día con varias sesiones: se suman los minutos.
- CL-2. Sesión con fecha futura: no aparece en el mapa, que termina en hoy.
- CL-3. Usuario sin sesiones: mapa completo en gris.
- CL-4. Los días se calculan en hora local, nunca UTC.
- CL-5. El mapa cruza el cambio de año sin tratamiento especial.

## Fuera de alcance

- Navegación a otros períodos (semanas anteriores).
- Borrado o edición de sesiones desde el mapa.
- Estadísticas adicionales (totales, medias) en la tarjeta del mapa.
- Colores personalizables por el usuario.
- Compartir o exportar el mapa.

## Decisiones asumidas (no preguntadas)

- La semana empieza en lunes (estándar en España).
- Paleta verde estilo GitHub (4 tonos de verde + gris).
- Tooltip nativo con los minutos exactos.
- Leyenda incluida bajo el mapa.

## Criterios de finalización

- CF-1. El mapa muestra 12 semanas terminando en la semana actual, con la
  semana actual a la derecha.
- CF-2. Cada día tiene el nivel correcto según sus minutos.
- CF-3. Los días sin sesión se ven en gris.
- CF-4. Al pasar el cursor se ven los minutos exactos.
- CF-5. La leyenda es visible y correcta.
- CF-6. Añadir una sesión actualiza el mapa al instante.
- CF-7. Verificado en Chrome DevTools: consola sin errores y móvil de 375 px.

## Dudas abiertas

- Ninguna.
