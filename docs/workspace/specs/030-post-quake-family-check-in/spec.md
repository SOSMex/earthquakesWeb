# Spec maestra de workspace — Estoy bien y Círculos
Fecha: 2026-10-24. ID compartido: post-quake-family-check-in. UX móvil v4 y web aprobadas por Oscar; autoriza cerrar coordinación y arrancar por Spec Kit. No acredita implementación ni autoriza deploy.
## Ubicación y autoridad
Este documento es la spec maestra de coordinación. Se conserva una copia idéntica en docs/workspace/specs/030-post-quake-family-check-in/spec.md de ambos repos y en el workspace documental. El recibo local registra hashes y revisiones; las rutas de estación de trabajo no se publican.
Cambios al contrato requieren actualizar maestro y consumidores en la misma revisión documental.
## Slices y responsabilidad
| Componente | Alcance / autoridad | Spec de ejecución |
| --- | --- | --- |
| earthquakesFlutter | Alerta, share, cuenta/círculos, invitación, membresía, reporte y launcher | [Spec030 móvil](https://github.com/SOSMex/earthquakesFlutter/blob/codex/post-quake-family-specs/specs/030-post-quake-family-check-in/spec.md) |
| earthquakesWeb | Landings event/join, SEO, errores, open explícito, código/tiendas y asociaciones | [Spec001 web](https://github.com/SOSMex/earthquakesWeb/blob/codex/post-quake-family-specs/.specify/specs/001-post-quake-family-check-in/spec.md) |
| Functions en Flutter | Validador/membresía/triggers existentes, solo consumo | Sin código/deploy nuevo |
| EarthquakesNetCoreApi | DTO público existente, sin cambio de productor | Contraste de consumidor web; sin trabajo de backend |
| MonitorAlertsApi/detector | Transporte esencial de alerta | Fuera del cambio |
Implementación móvil y web bajo esta misma coordinación por asignación explícita de Oscar. Los issues/PR de cada repo registran alcance, validación y entrega. No hay otro chat delegado ni responsable externo pendiente.
## Historias compartidas y aceptación
1. Avisar: un toque Estoy bien abre opciones del teléfono sin login/formulario/red; cancelación no guarda bienestar ni dispara auth/venta/reseña.
2. Entender: el círculo se forma directamente en la alerta sin Conocer Círculos. Ejemplo marcado, finito, CTA siempre, reduced motion/lifecycle.
3. Invitar: Por invitar→Invitación pendiente→Verificando incorporación→Se unió, solo con evidencia del hito. Reentrada conserva código válido; sin agenda nueva.
4. Reportar: bienestar explícito por identidad/evento con permisos/reconciliación existentes. Incorporación no marca seguro y el reporte conserva alcance a círculos del autor.
5. Recibir: web distingue evento público de invitación; abre app/tienda por acción, sin aceptar/transferir instalación automáticamente.
Aceptación completa remite US1–5/FR001–018/SC001–007 de móvil y WEB-FR001–010 de web. Cero falsas confirmaciones de entrega, membresía o bienestar. UX320/390/768 y200%, claro/oscuro/reduced motion; web añade1280. Comprensión≥4 de5 personas externas distingue aviso/reporte y pendiente/bienestar; resultado aún no obtenido.
## Contrato invariable
- Evento público: https://sismosmx.app/event/{collapseKey}; solo ID del productor, URI de un segmento válido. Sin ID, texto solo. Nunca compartir liveEventUrl firmada ni enviar secretos al cliente.
- earthquakeToken del origen identifica reporte. Token de catálogo identifica detalle conocido; no se deriva de collapseKey o eq_timestamp.
- /join/{CODE} y sismosmx://join/{CODE} son invitación de seis caracteres [ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}; /invite continúa siendo referido. La web no acepta ni consulta roster/reportes.
- GET validateInviteCode?code={CODE} (servicio público existente en el código del productor), público existente; consumidor web no-store/timeout10s. 200 valid:true con inviterName/expiresAt mínimos, 200 valid:false=no disponible; 400 sintaxis; red/timeout/5xx/JSON inválido=error recuperable. Nunca false=>expired/used sin evidencia.
- Launcher NUEVO planificado sismosmx://open sin path/query/fragment: solo activa la app según inicio/retorno normal sin forzar home/otro evento sobre alerta. Registrar/probar Android/iOS, no afirmar soporte actual ni clientes anteriores. Sin resolver /event nativamente. Clientes anteriores conservan landing/ayuda/tiendas.
- Abrir Sismos MX es genérico. Ver sismo en Sismos MX solo para destino/token de catálogo auténtico probado. Revisar en Sismos MX conserva consentimiento y verificación.
- Tiendas Android com.oscar.sismos_v2 e iOS6473684021, sujetos a validación de destinos al publicar; sin ID placeholder, auto-intent o timer forzoso.
- Invitación no-store/noindex,nofollow/OG genérico sin código/nombre; evento público mantiene datos reales y distingue ausencia/error sin cachear fallos como404. Source/fecha/actualización/magnitud se muestran solo si productor los aporta, no desde fixture.
- Sin schema, reglas, trigger, permisos, contactos, A/B, FCM/path de alerta, monetización o APIs nuevas. Nueva necesidad de productor vuelve a spec antes de código.
## Idempotencia y medición
Invitación por sesión UID/ownerId, código elegido válido o latest válida; error de lectura no crea, escritura incierta reconcilia servidor antes de reintentar, no exactly-once global nuevo. Aceptación conserva dedupe/transacción y membershipPending; bienvenida después de baseline servidor y nueva incorporación, una vez en sesión. Reporte explícito mantiene ID/guardas/reconciliación existentes.
Tap, hoja, click web, apertura, cuenta, membresía y reporte separados; sin inferir entrega, instalación atribuida o seguridad. Enums cerrados, sin IDs/códigos/URL/nombres/ubicación/error libre en nuevas métricas. No fingerprinting ni clipboard reads.
## Orden de entrega / rollback
Contrato maestro y specs enlazados → ADR/RFC → implementación web y móvil con fixtures independientes → preview web y build móvil compatibles para QA de enlace → web compatible publicada con autorización → release móvil autorizada/progresiva. No hace falta esperar deploy para escribir código compatible; QA conjunta sí espera ambas builds. Merge/docs/CI no acreditan deploy/dispositivo.
Rollback UI mediante release correctiva y reversión web acotada; preservar páginas/códigos ya emitidos, datos, miembros y reportes. Cliente anterior mantiene ayudas manuales. No apagado remoto o flag comercial inventados. Ningún dry-run escribe datos reales.
## Verificación / cierre documental
Flutter3.41.2 analyze, tests focalizados/goldens aislados, capturas y Android/iOS frío/caliente/ausente/instalada/embebido/cuenta/evento/background. Web npm run lint/build y checks focalizados con runner existente, preview/SEO/cache/error/secretos y certificados/AASA/assetlinks. No pruebas pesadas por redactar specs. Recibos por SHA/build/comando/entorno y omitidos.
T001/W001 se cierran cuando el maestro y los slices se publican en ramas de ambos repos con referencias recíprocas y propietario documentado. No requieren merge para comenzar código; merge/release tienen gates propios. La implementación de ambos repos pertenece a esta coordinación.
