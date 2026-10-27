# Research

- Decisión: conservar `itms-apps://itunes.apple.com/app/id6473684021?action=write-review` como intento iOS; es el enlace recuperado de la campaña OneSignal. Alternativa manual HTTPS con la misma acción, documentada por Apple.
- Decisión: detectar plataforma en cliente (incluye iPadOS MacIntel multitáctil); evita cachear redirecciones por UA y permite fallback sin JS. Alternativa 302 por UA no detecta iPadOS de escritorio de forma fiable.
- Decisión: destinos cerrados derivados de IDs existentes. Sin redirect configurable por query ni uso de overrides de descarga que admiten URLs externas.
- Decisión: un intento por pestaña; no timer de fallback que robe foco a la tienda o repita apertura al volver. Si el navegador bloquea, quedan enlaces visibles.
- Fuente: OneSignal `052906f7-54f0-404e-bd9e-cdfb8d20e0a1`; Apple https://developer.apple.com/documentation/storekit/requesting-app-store-reviews. Consulta 27/oct/2026. Evidencia web no prueba reseña nativa ni recepción FCM iOS.
