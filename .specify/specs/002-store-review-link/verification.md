# Verificación — 27/oct/2026

## Completado

- `npm run test:review`: 11 contratos aprobados (Android, iPhone, iPad, iPadOS escritorio, desktop, webview, bot y destinos).
- `npm run test:family`: 8 pruebas existentes aprobadas.
- `NEXT_TELEMETRY_DISABLED=1 npm run lint`: sin errores ni advertencias.
- `NEXT_TELEMETRY_DISABLED=1 npm run build`: exit 0, generación de 23 rutas; `/calificar` estática, 897 B y 96.9 kB First Load JS. Incluye validación TypeScript/lint.
- GET local `/calificar?url=https://example.org`: 200, canonical correcto, `noindex, nofollow`, destinos fijos; ambos enlaces presentes en el HTML sin ejecutar JavaScript.
- Revisión visual en navegador de escritorio: título, copy y ambas tiendas visibles; no navegación automática observada durante la revisión. El botón App Store conserva `action=write-review`.
- Sitemap revisado: no incluye `/calificar`. AASA, assetlinks y rutas de invitación sin modificaciones.

## Límites

El build local no tiene las variables de las APIs sísmicas. Las páginas existentes registran `Invalid URL` al intentar precargar datos; el build finaliza exitosamente. También informa Browserslist desactualizado y advertencia experimental del Node local. Esto no demuestra funcionamiento productivo del mapa.

Los tests de UA verifican selección de destino, no la apertura de tiendas instaladas. Quedan pendientes iPhone/iPad/Android reales, bloqueo de apertura, vuelta a la página y browsers integrados en la URL publicada. El HTML sin JS se verificó por respuesta HTTP, no desactivando JS en el navegador.

La fuente iOS es la notificación OneSignal `052906f7-54f0-404e-bd9e-cdfb8d20e0a1`: `itms-apps://itunes.apple.com/app/id6473684021?action=write-review`. Se conserva su destino, sin copiar credenciales ni tokens.

No se envió una campaña ni se validó recepción FCM iOS. Merge/CI, despliegue web, apertura de tienda y reseña publicada se verifican por separado.
