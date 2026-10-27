# ADR-001: Enlace de calificación por plataforma

**Fecha:** 2026-10-27
**Estado:** Implementación solicitada; aceptación instalada y publicación pendientes

## Contexto

Una misma push necesita abrir Google Play en Android y la acción de escribir reseña del App Store en iOS. La campaña iOS de OneSignal ya usa el ID 6473684021 y `action=write-review`. Un enlace sólo a Play Store no sirve para audiencia mixta.

## Decisión

Publicar `/calificar` con destinos oficiales fijos, seleccionados en el navegador, y enlaces explícitos de fallback. iOS intenta el deep link de OneSignal y ofrece HTTPS con la misma acción; Android usa HTTPS a Google Play. Un intento automático por pestaña, sin redirect HTTP cacheado por plataforma. Desktop/bots no navegan automáticamente.

## Consecuencias

No requiere cambios móviles para la página web; el navegador puede exigir interacción y la tienda puede pedir sesión. El contrato no garantiza reseña publicada ni compatibilidad FCM iOS. AASA/assetlinks y otras rutas conservan su comportamiento. Antes de campañas se verifica la URL publicada y las tiendas instaladas.

Contrato: [Spec002](../../.specify/specs/002-store-review-link/spec.md).
