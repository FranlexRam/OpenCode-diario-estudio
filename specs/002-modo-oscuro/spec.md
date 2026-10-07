# Spec 002 - Modo Oscuro

Estado: borrador

## Contexto y objetivo

El Diario de Estudio actualmente solo tiene tema claro. Los usuarios que estudian de noche o entornos con poca luz necesitan un modo oscuro que reduzca la fatiga visual. El objetivo es ofrecer un toggle accesible en la cabecera para alternar entre tema claro y oscuro, respetando la preferencia del sistema operativo cuando no hay elección guardada.

## Usuarios

- **Estudiante:** persona que registra sesiones de estudio. Quiere alternar entre tema claro y oscuro según su preferencia o la hora del día.

## Historias de usuario

- **HU-1.** Como estudiante, quiero un botón en la cabecera para alternar entre modo claro y modo oscuro para adaptar la interfaz a mi entorno de estudio.
- **HU-2.** Como estudiante, quiero que mi preferencia de tema se guarde automáticamente para no tener que cambiarla cada vez que abro la página.
- **HU-3.** Como estudiante, quiero que el sistema respete la preferencia de mi sistema operativo la primera vez que abro la página para que la experiencia sea coherente con mi dispositivo.

## Requisitos funcionales (EARS)

### RF-1. Toggle en cabecera

**CUANDO** el usuario carga la página, **EL SISTEMA** **debe** mostrar un botón toggle en la cabecera que permita alternar entre tema claro y tema oscuro.

**CUANDO** el usuario hace clic en el botón toggle, **EL SISTEMA** **debe** cambiar el tema de toda la interfaz (claro ↔ oscuro) de inmediato.

**MIENTRAS** el tema oscuro está activo, **EL SISTEMA** **debe** mostrar el botón en su estado "oscuro" (icono o texto que indica que al pulsar volverá al claro).

**MIENTRAS** el tema claro está activo, **EL SISTEMA** **debe** mostrar el botón en su estado "claro".

### RF-2. Persistencia en localStorage

**CUANDO** el usuario selecciona un tema (claro u oscuro), **EL SISTEMA** **debe** guardar la preferencia en localStorage.

**CUANDO** el usuario vuelve a abrir la página, **EL SISTEMA** **debe** leer la preferencia guardada y aplicarla automáticamente.

**SI** no hay preferencia guardada en localStorage, **ENTONCES** **EL SISTEMA** **debe** detectar la preferencia del sistema operativo.

### RF-3. Detección de preferencia del sistema operativo

**SI** no hay preferencia guardada y el sistema operativo está en modo oscuro, **ENTONCES** **EL SISTEMA** **debe** aplicar el tema oscuro por defecto.

**SI** no hay preferencia guardada y el sistema operativo está en modo claro, **ENTONCES** **EL SISTEMA** **debe** aplicar el tema claro por defecto.

**SI** el usuario ha guardado una preferencia, **ENTONCES** **EL SISTEMA** **debe** ignorar la preferencia del sistema operativo.

### RF-4. Contraste en modo oscuro

**MIENTRAS** el tema oscuro está activo, **EL SISTEMA** **debe** garantizar que el texto principal tenga un ratio de contraste mínimo de 4.5:1 (WCAG AA) sobre el fondo.

**MIENTRAS** el tema oscuro está activo, **EL SISTEMA** **debe** garantizar que el texto secundario tenga un ratio de contraste mínimo de 4.5:1 (WCAG AA) sobre el fondo.

**MIENTRAS** el tema oscuro está activo, **EL SISTEMA** **debe** mantener los colores del mapa de calor distinguibles entre sí y con buen contraste sobre el fondo oscuro.

**MIENTRAS** el tema oscuro está activo, **EL SISTEMA** **debe** mantener los bordes y separadores visibles pero no estridentes.

### RF-5. Restricción de 3 archivos

**EL SISTEMA** **debe** implementar el modo oscuro sin añadir nuevos archivos de JavaScript, CSS ni HTML.

**EL SISTEMA** **debe** implementar el modo oscuro sin añadir dependencias, frameworks ni librerías externas.

## Requisitos no funcionales

- **RNF-1.** El cambio de tema debe ser instantáneo (sin parpadeo perceptible).
- **RNF-2.** El botón toggle debe ser accesible por teclado y lectores de pantalla (ARIA).
- **RNF-3.** La preferencia debe guardarse en localStorage con una clave específica para el tema (separada de `diarioEstudio.sesiones`).
- **RNF-4.** El modo oscuro no debe romper el diseño responsive existente.

## Casos límite

- **CL-1.** El usuario borra el localStorage: el sistema debe volver a detectar la preferencia del SO.
- **CL-2.** El usuario cambia la preferencia del SO después de haber guardado una: el sistema debe mantener la preferencia guardada (no sobrescribirla).
- **CL-3.** El navegador no soporta `matchMedia`: el sistema debe aplicar el tema claro por defecto.
- **CL-4.** El usuario tiene el sistema en modo oscuro pero prefiere el claro: al hacer toggle, se guarda "claro" y se respeta aunque el SO esté en oscuro.

## Fuera de alcance

- Temas personalizados (solo claro y oscuro).
- Transición animada entre temas (aunque es deseable, no es obligatorio).
- Programación automática de tema según hora del día.
- Sincronización de tema entre pestañas.

## Criterios de finalización

- El botón toggle aparece en la cabecera y alterna entre claro y oscuro.
- La preferencia se guarda en localStorage y se restaura al recargar.
- Sin preferencia guardada, se respeta `prefers-color-scheme` del SO.
- El modo oscuro mantiene contraste AA en texto y mapa de calor.
- No se añaden archivos ni dependencias nuevas.
- Tests de las funciones puras de tema pasan con `node --test`.
- Validación visual en Chrome DevTools (375 px) sin errores de consola.

## Dudas abiertas

- Ninguna.
