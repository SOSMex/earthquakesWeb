# Feature Specification: Enlace de calificación por plataforma

**Feature Branch**: `codex/store-review-link`
**Created**: 2026-10-27
**Status**: Implemented; device and production acceptance pending
**Input**: Crear un enlace en la landing que abra Google Play o la acción de escribir reseña del App Store; recuperar el destino iOS de OneSignal.

## User Scenarios & Testing

### User Story 1 - Escribir una reseña desde iPhone o iPad (Priority: P1)

Al abrir el enlace de la campaña, la persona debe llegar a la acción de escribir reseña de Sismos México.

**Why this priority**: Evitar enviar usuarios de iOS a Google Play o a una ficha sin la acción de reseña.
**Independent Test**: Abrir el enlace en iPhone/iPad con App Store y comprobar el destino de reseña.
**Acceptance Scenarios**:
1. Con iOS reconocido, al abrir el enlace se intenta abrir la acción de reseña de Sismos México.
2. Si el navegador bloquea la apertura, quedan disponibles el botón de App Store y su alternativa web.

### User Story 2 - Calificar desde Android (Priority: P1)

**Why this priority**: Conservar la llegada a la ficha Android ya utilizada en la prueba de push.
**Independent Test**: Abrir el mismo enlace en Android y comprobar el paquete de la ficha.
**Acceptance Scenarios**:
1. Con Android reconocido, se intenta abrir la ficha de Sismos México en Google Play.
2. Si no hay tienda o la apertura no ocurre, se puede usar el enlace HTTPS de Google Play.

### User Story 3 - Elegir tienda sin detección (Priority: P2)

**Why this priority**: El enlace debe funcionar en escritorio, con scripts desactivados o dentro de navegadores limitados.
**Independent Test**: Abrir la página sin scripts y comprobar ambos enlaces.
**Acceptance Scenarios**:
1. En escritorio o plataforma desconocida, no se fuerza una tienda; ambas opciones quedan visibles.
2. Al volver a la página no se repite un bucle automático de apertura en la misma pestaña.

### Edge Cases

iPad con agente de escritorio, navegador integrado, rechazo del diálogo de apertura, robots, scripts desactivados y parámetros de URL no confiables.

## Requirements

- **FR-001**: Una URL pública estable debe servir a ambas plataformas.
- **FR-002**: iOS debe conservar el ID `6473684021` y la acción `write-review`; Android, `com.oscar.sismos_v2`.
- **FR-003**: Si la apertura automática falla, la persona podrá elegir la tienda mediante enlaces visibles.
- **FR-004**: Parámetros de campaña o destinos externos no podrán cambiar los destinos permitidos.
- **FR-005**: La página no pedirá una calificación positiva ni condicionará la reseña a una encuesta.
- **FR-006**: No debe interceptar invitaciones, Premium ni enlaces de sismos existentes.
- **FR-007**: Abrir una tienda no debe contarse como reseña publicada.

## Sismos MX Scope

### Repo Matrix

| Repo | Role | Change | Owner |
|---|---|---|---|
| earthquakesWeb | URL y elección de tienda | web, contrato, docs | Sí |
| MonitorAlertsApi | Futuro consumidor del enlace | documentación de coordinación; sin envío | No |
| earthquakesFlutter | Cliente de push existente | Sin modificación | No |
| EarthquakesNetCoreApi / seismic-detector | Sin participación | Ninguno | No |

### Contract Boundaries

Contrato público en [contracts/review-link.md](contracts/review-link.md). Coordinación en [spec025](../../../docs/workspace/specs/025-fcm-review-prompts/spec.md). La URL no cambia el payload ni demuestra recepción FCM en iOS. No cambia AASA, assetlinks ni auth de las APIs.

### Existing ADR/RFC/Runbook Context

MonitorAlertsApi RFC-058 (borrador local, prueba Android debug); `docs/rfc/001-ui-ux-interactivity.md` sólo aplica al mapa y queda fuera. ADR nuevo de este enlace en `docs/adr/001-store-review-link.md`.

### Out Of Scope

Envío productivo, segmentación de audiencia, worker, adopción móvil y métricas de reseñas publicadas.

## Success Criteria

- **SC-001**: Todas las variantes de plataforma de la matriz seleccionan la tienda correcta.
- **SC-002**: Las dos tiendas permanecen accesibles sin scripts y con apertura bloqueada.
- **SC-003**: Ningún parámetro de entrada cambia el destino a otro dominio o app.
- **SC-004**: Validación instalada Android/iOS documentada por separado de las pruebas web.

## Assumptions

Ruta elegida `/calificar`; enlaces de tienda oficiales fijos. La tienda puede exigir sesión, instalación o disponibilidad regional. No se promete que el navegador permita apertura automática.
