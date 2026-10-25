# Tasks — web001 / coordinación móvil030
Siete tareas exportadas del alcance aprobado; solo W001 documental se completa tras publicación verificable. W001–W005 implementadas/verificadas; W006/W007 conservan gates instalados/deploy pendientes. Contratos/plan/maestro son prerrequisitos; no cambiar APIs/backend.
## Phase 1 — Setup
- [x] W001 Publicar spec/plan/research/modelo/quickstart/tasks y contratos con maestro byte-idéntico y enlaces recíprocos en .specify/specs/001-post-quake-family-check-in/ y docs/workspace/specs/030-post-quake-family-check-in/spec.md; registrar responsable e issue/PR en verification.md. Apuntar .specify/feature.json a este slice solo en rama propia, no alterar develop o sesiones ajenas.
## Phase 2 — Invitación (US2, P1)
Test independiente: true/false/error, apertura/copia solo por tap, review/consentimiento en app, recuperar código sin prometer deferred.
- [x] W002 [US2] Implementar validador existente no-store/timeout10s, forma exacta y outcomes true/false/error en src/app/join/[code]/page.tsx y helper src/lib/family-links.ts; metadata noindex/nofollow/OG genérico, sin roster/código/nombre en nueva telemetría.
- [x] W003 [US2] Aplicar UX/animación aprobada a src/app/join/[code]/JoinCircleLanding.tsx con CTA explícito join, reduced motion/CTA inmediato/foco, tiendas correctas y código copiar manual; eliminar auto-intent/timer/localStorage deferred y no aceptar membresía desde web.
## Phase 3 — Evento (US1, P1)
Test independiente: found/incompleto/notFound/error conserva contexto público y salida manual; open genérico no finge evento nativo.
- [x] W004 [US1] Adaptar src/app/event/[id]/page.tsx, EarthquakeStoryCard.tsx y src/services/earthquakes/earthquakes.service.ts: UX aprobada sin toolbar, resultado discriminado compatible, solo datos reales/preliminaridad/fuente, secretos server, open genérico vs catálogo verificado; sin anticipación garantizada ni venta/reseña incidental.
## Phase 4 — Contratos / entrega
- [x] W005 Añadir tests focalizados tests/family-links/contracts.test.cjs y tests/family-links/tsconfig.json usando tsc existente + Node built-in test sobre helpers; escenarios validación/links/metadata y browser UI, sin nuevo framework; registrar comandos finales y capturas en .specify/specs/001-post-quake-family-check-in/verification.md.
- [ ] W006 Ejecutar lint/build/tests y walkthrough de .specify/specs/001-post-quake-family-check-in/quickstart.md: previews, API/errors/cache/robots/secretos, stores, public/.well-known/apple-app-site-association/assetlinks, Android/iOS/embebido/app ausente-vieja-frío-caliente; registrar build launcher compatible y límites en verification.md, no soporte /event nativo inventado.
- [ ] W007 Registrar PR/CI/SHA, autorización/receipt de deploy y rollback en .specify/specs/001-post-quake-family-check-in/verification.md e issue web; publicar web compatible antes de release móvil, conservando rutas/códigos/datos. No marcar entrega por docs/HTML/merge.
## Dependencias / paralelo / estrategia
W001→W002→W003; W004 tras W001 puede prepararse en paralelo a join por archivos distintos, salvo helper compartido family-links.ts que se integra secuencialmente. W005 espera W003/W004, W006 espera W005 y build móvil launcher, W007 espera W006/autorización. Test helpers primero por escenario antes de cambiar comportamiento; browser aceptación al integrar. MVP web invitación W002/W003 probado con revisión nativa existente; evento W004 es independiente con fixtures. No orden de lanzar agentes o reservar recursos.
## Coverage
WEB-FR001/002/008→W004/W005/W006; WEB-FR003/007→W002/W005/W006; WEB-FR004/005/006→W003/W005/W006; WEB-FR009→W003/W004/W005/W006; WEB-FR010→W002/W003/W004/W005. WEB-SC001–005→W005/W006/W007. Ninguna implementación acreditada por esta tabla.
