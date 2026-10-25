# Feature Specification: Recibir un sismo o invitación en la web
**ID:** web001 / coordinación móvil030. **Fecha:**2026-10-24. **Estado:** UX aprobada por Oscar, especificación de ejecución; no implementada.
**Issue padre:** [Flutter372](https://github.com/SOSMex/earthquakesFlutter/issues/372). **Maestro workspace:** [maestro común](../../../docs/workspace/specs/030-post-quake-family-check-in/spec.md). **Slice móvil:** [spec030](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/specs/030-post-quake-family-check-in/spec.md).
**Responsable:** implementación móvil y web a cargo de esta coordinación, por asignación de Oscar.
## User Scenarios & Testing
### User Story 1 — Entender el sismo compartido (P1)
La familia abre un enlace y encuentra contexto público útil antes de decidir abrir app o tienda.
**Independent Test:** abrir evento válido/incompleto/ausente/error en móvil/escritorio sin app; la página conserva el contexto, no publica bienestar y ofrece acción voluntaria/salida.
**Acceptance:** datos solo de fuente real, preliminaridad/fecha/fuente cuando existan; ausencia y error diferenciados; Abrir Sismos MX genérico sin fingir detalle; destino exacto solo con token catálogo auténtico probado. Sin datos personales del emisor ni garantía de anticipación.
### User Story 2 — Revisar una invitación sin perder control (P1)
El receptor entiende el beneficio familiar y revisa la invitación en app; código manual lo ayuda si instala después.
**Independent Test:** validar true/false/red/timeout/malformed, tocar CTA, volver y copiar código voluntariamente; abrir la página/tienda no acepta ni crea membresía.
**Acceptance:** seis caracteres exactos; valid:false=no disponible sin afirmar caducidad/uso; error recuperable con retry. Animación finita ilustrativa/reduced motion, CTA desde primer frame; no roster o falsa respuesta. Sin auto-intent/timer, sin detección de instalación. Tiendas visibles, código en ayuda progresiva; instalar requiere reabrir enlace o introducir código.
### Edge Cases
Navegador embebido, Android/iOS/desconocido, app ausente/vieja/frío/caliente, links reenviados, código inválido, validador no disponible, evento sin magnitud/fuente, texto200%, teclado/foco,320/375/768/1280 y claro/oscuro.
## Requirements
- **WEB-FR001:** evento e invitación MUST conservar páginas distintas y revelar solo información autorizada pública.
- **WEB-FR002:** evento MUST distinguir encontrado/incompleto/ausente/error; no inventar datos/fuente/hora o anticipación real.
- **WEB-FR003:** invitación MUST validar disponibilidad con productor existente y distinguir false de error sin consultar roster.
- **WEB-FR004:** abrir app/tienda/copiar MUST requerir acción; sin aceptar/autenticar/redirigir automáticamente ni timer forzoso.
- **WEB-FR005:** revisar invitación MUST continuar por consentimiento/membresía en app; instalar/acceder no significa aceptar ni responder.
- **WEB-FR006:** tiendas y recuperación manual MUST permanecer alcanzables; sin promesa deferred/atribución o clipboard reads.
- **WEB-FR007:** invitaciones MUST evitar indexación, caché pública y previews de nombre/código/miembros; secretos nunca llegan al cliente.
- **WEB-FR008:** CTA MUST describir el destino compatible, exacto solo cuando probado; no convertir collapseKey en token catálogo.
- **WEB-FR009:** UX MUST corresponder a referencia aprobada, ser accesible a200%/320–1280, claro/oscuro y reduced motion, con foco/acciones siempre.
- **WEB-FR010:** medición MUST diferenciar click/apertura/membresía/reporte y usar valores cerrados sin códigos/PII/URLs, sin inferir instalación o entrega.
## Key Entities
Evento público, validación mínima de invitación, intención de apertura/copia y resultado recuperable; autoridad de pertenencia/bienestar sigue móvil/servidor.
## Scope
Solo earthquakesWeb: /event/[id], /join/[code], helpers de sus consumidores y metadatos/tiendas/links. Android/iOS launcher y reportes pertenecen a móvil. Sin APIs nuevas, datos privados, funciones, auth web, schema, map redesign, Zustand migration, referidos/Premium/ASO global o simulacrum incidental.
Fuente inspeccionada: develop5f8453d5e135b357aabf9926d5bb00482bbd7109, no deploy. Contratos [links](contracts/links-and-web.md); maestro enlaza compatibilidad, notification-channel sin cambios, rollout/rollback y ambas specs.
## Success Criteria
- **WEB-SC001:** todas las rutas probadas conservan contexto/ayuda sin redirigir o aceptar al cargar.
- **WEB-SC002:** matriz true/false/400/red/timeout/5xx/malformed mantiene resultado correcto y cero exposición privada/secreto.
- **WEB-SC003:** cero acciones bloqueadas/overflow que impida uso en320/375/768/1280/200%, claro/oscuro/reduced motion.
- **WEB-SC004:** ambos OS, app instalada/ausente/vieja/frío/caliente/embebido tienen acción explícita y recuperación manual, sin éxito ficticio.
- **WEB-SC005:** previews/robots/caché de invitación no contienen código/nombre/roster; métricas no cuentan visitas como instalaciones.
## Assumptions / Reference
[HTML web aprobado](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/docs/design/estoy-bien-concept/web.html), [CSS](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/docs/design/estoy-bien-concept/web.css), [JS](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/docs/design/estoy-bien-concept/web.js), [snapshot](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/specs/030-post-quake-family-check-in/approved-reference.json). El fixture no es productor de datos/membresía. La toolbar de revisión no se integra a la landing real. Fuente/prototipo no acreditan dispositivo, API vivo, deploy o tienda.
