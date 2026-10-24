# Verificación web001

Implementación autorizada y publicada en [PR531](https://github.com/SOSMex/earthquakesWeb/pull/531), coordinada con [móvil373](https://github.com/SOSMex/earthquakesFlutter/pull/373).

- npm run test:family: 8 PASS; gramática estricta, plataforma, resultados de servidor, no-store, tiendas y eliminación de identificadores en métricas de página.
- npm run lint: PASS sin warnings/errors. npm run build: PASS, sin ruta de QA. Sin credenciales productivas, las páginas existentes que dependen de API_URL registran falta de configuración; no prueba datos de producción.
- Workflow Web quality agrega npm ci, contratos, lint y build en Ubuntu/Node20. [Run inicial PASS](https://github.com/SOSMex/earthquakesWeb/actions/runs/40139261249); PR conserva resultado por SHA final.
- Browser: invite sintético disponible, abrir ayuda, copiar con confirmación tras tap; error con reintento conservando contexto. HTTP de forma inválida devuelve no-store/must-revalidate, X-Robots-Tag noindex/nofollow/noarchive y OG genérico sin código.
- Capturas SSR375/768/1280 y error320, ambos temas; cero overflow horizontal. SSR estático usa fuente fallback; fuente real e interacción verificadas separadamente en navegador. Fixture temporal no se publica, no se creó invitación ni se aceptó membresía real.
- [Galería, recibo y límites](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/docs/design/estoy-bien-concept/implementation-evidence/README.md).

W006/W007 pendientes: Android/iOS instalados, app ausente/vieja/frío/caliente/embebido, asociaciones/certificados publicados, servidor autorizado y deploy. Abrir/copy/store no prueban apertura/instalación/aceptación. Sin merge ni despliegue. Publicar web compatible antes del cliente; rollback conserva rutas/códigos/datos.

## Reflujo con texto grande
Se reprodujo overflow de64px a375 con fuentes reales y texto200%. Ajustes de reflujo corrigen header/títulos/CTA/tiendas sin ocultar overflow; nueva medición0px. [Galería actual](../../../docs/design/post-quake-family-check-in/README.md). Lint/build vuelven a pasar tras retirar el fixture.
