---
name: sdd
description: Úsala siempre que trabajes con Spec-Driven Development en este proyecto (docs/constitution.md o cualquier archivo dentro de specs/): redactar, revisar o cambiar specs, planes y tareas, o implementar y validar tareas de una spec.
---

# Spec-Driven Development (SDD)

## Flujo
Constitución -> Spec -> Clarificación -> Plan -> Tareas -> Implementación -> Validación (-> Cambio).

- Nunca pases a la siguiente fase sin la aprobación explícita del usuario.
- La spec manda: si algo no está en la spec, no se implementa. Si falta una decisión, para y pregunta.
- Un cambio de requisitos se hace primero en la spec, luego en el plan y las tareas, y por último en el código.
- Cada spec vive en su carpeta: specs/NNN-nombre/ con spec.md, plan.md y tasks.md.
- Al terminar cada fase, actualiza MEMORY.md.

## Plantilla de spec (spec.md)
# Spec NNN - <Nombre>
Estado: borrador | aprobada | implementada
## Contexto y objetivo
## Usuarios
## Historias de usuario (HU-1. Como <rol>, quiero <acción> para <beneficio>)
## Requisitos funcionales (en EARS en español: CUANDO, SI... ENTONCES, MIENTRAS, EL SISTEMA)
## Requisitos no funcionales
## Casos límite
## Fuera de alcance
## Criterios de finalización
## Dudas abiertas ([NECESITA ACLARACIÓN])

La spec describe el QUÉ y el POR QUÉ. Nada de stack, arquitectura ni nombres de archivos.

## Plan (plan.md)
Archivos y responsabilidades, funciones puras (con "hoy" como parámetro), decisiones justificadas con alternativas descartadas, y estrategia de tests con node --test.

## Tareas (tasks.md)
Checkboxes [-] Tn. <Descripción>. RF-x, RF-y. Hecho cuando: <comprobación verificable>. Máximo 20-30 min por tarea.

## Implementación
Una sola tarea cada vez: tests primero (en rojo), después el código, node --test en verde, marcar la tarea y parar.
