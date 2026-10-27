# Contrato público: GET /calificar

Página HTML estática con `noindex, nofollow`, canonical `/calificar`, sin API externa ni redirección HTTP dependiente de User-Agent. La selección ocurre en el navegador, evitando contaminación de caché entre plataformas.

| Plataforma | Intento automático | Alternativa explícita |
|---|---|---|
| iPhone/iPad/iPod; iPadOS MacIntel multitáctil | `itms-apps://itunes.apple.com/app/id6473684021?action=write-review` | `https://apps.apple.com/app/id6473684021?action=write-review` |
| Android | `https://play.google.com/store/apps/details?id=com.oscar.sismos_v2&hl=es_MX&gl=MX` | El mismo enlace HTTPS |
| Escritorio/desconocido/robot | Ninguno | Ambos enlaces HTTPS |

Un intento automático por pestaña usando sessionStorage; fallback de memoria si no está disponible. Botones nunca dependen de scripts. No temporizador que cambie de destino después de abrir una tienda, ni parámetros `redirect`/`url`/`platform` interpretados.

Conservar las asociaciones AASA/assetlinks y el manifest móvil. `/calificar` no se añade a las rutas que abre Sismos MX. Antes de producción comprobar que versiones instaladas no capturan el enlace como ruta desconocida.

Fuente del deep link iOS: campaña OneSignal `052906f7-54f0-404e-bd9e-cdfb8d20e0a1`, consultada 27/oct/2026. El fallback HTTPS con `action=write-review` está documentado por Apple: https://developer.apple.com/documentation/storekit/requesting-app-store-reviews.

Rollout: publicar web, verificar destino en Android/iOS reales y sólo después usar URL en campañas. Rollback: retirar URL de nuevas campañas y revertir el intento automático, conservando página con ambos enlaces para mensajes ya entregados. El trabajo web no autoriza por sí mismo un envío ni prueba el transporte iOS.
