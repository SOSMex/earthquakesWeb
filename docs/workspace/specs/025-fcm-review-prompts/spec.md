# Coordinación propuesta: solicitudes de reseña por FCM

Fecha: 2026-10-26. Actualización: 2026-10-27. Estado: propuesta documental; puente Android probado en emulador debug, implementación y activación productivas pendientes.

Documento principal: MonitorAlertsApi `docs/rfc/058-fcm-review-prompts.md` (borrador local). Copia de coordinación del 27/oct; slice web: [Spec002](../../../../.specify/specs/002-store-review-link/spec.md).

## Resultado buscado

Recuperar solicitudes de reseña mediante FCM, con un aviso ordinario cuyo tap abra la tienda de Sismos MX sin activar el flujo sísmico. Se distinguen dos etapas:

- **A, puente Android:** FCM data-only con formato interno de OneSignal y su SDK ya instalado. La prueba individual funcionó sin actualizar la app; release publicada y audiencia productiva siguen pendientes. Evita la API de envío de OneSignal, pero no elimina su SDK ni garantiza ausencia de llamadas de analytics/receipts.
- **B, contrato propio:** actualización móvil con preferencia «Solicitudes de opinión», suscripción gradual al topic `review_prompts_v1`, validación y manejo propios en Android/iOS. Las garantías móviles nuevas no se atribuyen al cliente antiguo.

## Evidencia individual del 27/oct

Un solo envío HTTP v1 al token obtenido desde Ajustes de `emulator-5580` (`Medium_Phone`), contrastado con esa instalación. Sismos MX **6.0.3 (447), debug**, sin recompilar ni reinstalar; se habilitó el permiso de notificaciones bloqueado. FCM respondió 200, Android registró la notificación en **`aviso`**, OneSignal guardó `opened=1` y el tap lanzó Google Play. La URL guardada apunta a `com.oscar.sismos_v2`; Play Store pidió iniciar sesión, por lo que no se verificó la ficha renderizada ni una reseña publicada.

No hubo envío a topics ni cambio de worker/configuración productiva. No se validaron release, iOS, foreground, force-stop, offline/TTL, duplicados o alerta simultánea. El RFC contiene payload sanitizado, identificadores de evidencia y gates restantes. `aviso` es un canal Android, no un topic; el ensayo no acredita una audiencia general existente.

## Responsabilidades

| Repo | Responsabilidad |
|---|---|
| MonitorAlertsApi | Reutilizar scorer/worker; persistir reseña, cooldown, cancelación y resultado; builders separados A/B, un contrato y audiencia por campaña |
| earthquakesFlutter | A: QA del SDK existente en Android. B: preferencia, topic, presentación, validación y apertura explícita de tienda en Android/iOS |
| earthquakesWeb | Ruta /calificar con selección de tienda y fallback; sin cambios al transporte de push |
| EarthquakesNetCoreApi | Sin cambios; cualquier registry requiere revisar alcance |

El RFC contiene contrato de payload, estados de tarea, defaults, rollout, rollback y matriz de pruebas. Antes de implementación, convertir ese contrato en slices Spec Kit de cada repo y publicar enlaces compartidos resolubles. No modificar los punteros `.specify/feature.json` de otros trabajos durante esta propuesta.

## Criterios de aceptación

- Reseña programada durable e independiente del resultado de story; un reinicio no pierde tareas pendientes vigentes.
- Cooldown global basado en reseña y resultado incierto, nunca renovado por tarjetas de story.
- Un único proveedor por campaña; los registros simulados/antiguos no se reproducen al activar Live.
- Cambiar de builder A/B no reencola el mismo evento ni duplica una campaña. Sin fallback automático a OneSignal.
- B: payloads informativos desconocidos/conflictivos no llegan al parser sísmico; pruebas de regresión para payloads legacy. A: validar por versión el consumo del payload por el SDK existente y la convivencia con alertas.
- Tap de aviso válido abre la tienda correcta; no se abre al recibir ni se interrumpe una alerta activa.
- Reseñas de eventos reales en fase 1; simulacros de producción en fase 2 explícita. Staging nunca selecciona audiencia productiva.
- Pruebas de backend, Flutter, rutas nativas y recepción instalada por SHA antes de activación; aceptación FCM no equivale a recepción ni a reseña publicada.

## Pendientes previos a ejecución

Primero validar release Android y resolver audiencia del puente. Un token QA no acredita un registry general; el usuario eligió `alerts_native_v1` para la prueba, pero la segmentación Android y el comportamiento iOS siguen por resolver antes del envío. Si se necesita un topic nuevo, su suscripción requiere actualización y adopción gradual. Aceptar o ajustar etapa y defaults antes de implementar; ambas etapas conservan persistencia, cooldown, dry-run, corte de histórico y rollback del RFC.

Para B, corregir el ID de tienda iOS en Flutter: Apple confirma que `6473684021` pertenece a Sismos México (`com.oscar.sismosv2`), mientras `1528156046` pertenece a WIDEX MAGNIFY. La apertura instalada iOS sigue pendiente. El worker migrado y las campañas productivas siguen sin activarse. La nueva ruta web se implementa por separado.

## Enlace de calificación por plataforma (27/oct)

Implementación web en `SOSMex/earthquakesWeb`, rama `codex/store-review-link`, Spec002 y ADR-001. URL prevista: `https://sismosmx.app/calificar`. iOS intenta `itms-apps://itunes.apple.com/app/id6473684021?action=write-review`, recuperado de OneSignal; fallback HTTPS conserva la acción. Android abre Google Play para `com.oscar.sismos_v2`. Publicación y QA de tiendas instaladas pendientes; esto no valida transporte FCM en iOS.
