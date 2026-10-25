# Contrato móvil ↔ web — UX aprobada, ejecución pendiente

## Evidencia de código inspeccionada

Repositorio web SOSMex/earthquakesWeb, develop; búsqueda devolvió commit 5f8453d5e135b357aabf9926d5bb00482bbd7109. Es lectura de fuente, no comprobación de deploy:

- src/app/simulacrum/page.tsx: landing existente con tiendas y contexto de ejercicio.
- src/app/event/[id]/EarthquakeStoryCard.tsx: evento, compartir, campañas y CTA; contiene copy de anticipación derivado de ETA y venta/reseña que no se adopta como evidencia de entrega ni como UX de este alcance.
- src/app/join/[code]/JoinCircleLanding.tsx: valida solo forma amplia (>=4), localStorage pendingInviteCode, intent Android automático y fallback iOS por temporizador a un ID de ejemplo id1234567890. No demuestra validación pública de vigencia, deferred linking ni app instalada. Debe reconciliarse con el código de tienda real antes de tocar ese recorrido.
- public/.well-known/apple-app-site-association: paths /join/*, /invite/*, /sismos/detalle/*, /premium, /simulacrum; no /event/*. Android móvil declara sus familias de rutas por separado. No se verificó la asociación publicada/certificados en dispositivos.

## Dos URLs, dos propósitos

| Entrada | Contenido público permitido | Acción | Nunca implica |
| --- | --- | --- | --- |
| Evento conocido | Datos disponibles, fuente, fecha/actualización y preliminaridad | Consultar evento / abrir app / tiendas | Reporte de seguridad de la persona o anticipación experimentada |
| /join/{CODE} | Invitación disponible y, solo cuando validado, inviterName/expiresAt | Revisar invitación en app; código manual | Aceptación, membresía, entrega de aviso o respuesta de bienestar |

No cambiar /invite de referidos por /join de Círculos. Respetar sismosmx://join/{CODE}, código de seis caracteres del alfabeto existente, misma invitación para QR/código/enlace, vigencia del servicio. La URL pública del evento será https://sismosmx.app/event/{collapseKey}, ya usada por ShareHelper; no introducir otro endpoint ni convertir esa identidad en token de catálogo.

Validación pública existente de PendingInvitationService: valid:true con inviterName/expiresAt o valid:false; null/transporte es error recuperable. La Function inspeccionada admite GET público y cors:true. Web consulta desde servidor con no-store y timeout10s; disponibilidad real se valida antes del deploy, sin nuevo endpoint. No hay autorización para ampliar su respuesta. Validar sintaxis no equivale a vigencia. No deducir expired/used de false genérico. No exponer el roster ni reportes por código público. Metadatos de previews genéricos sin códigos/nombres en analytics y sin estados privados.

## UX web aprobada por Oscar — 2026-10-24

web.html contiene invitación y evento, a móvil y escritorio, con reintento/no disponible. Abrir en app es explícito; sin intent automático al cargar, temporizador forzoso a tienda, aceptación web o lectura del clipboard. Tiendas visibles; código como ayuda progresiva, copiar solo por acción. Código K7M2Q9 en el prototipo es fixture, no invitación real.

No detectar instalación a partir de user agent/timer. Sin app: descargar, luego volver al enlace o introducir código. En app: revisar identidad/invitación, acceso si hace falta, confirmar y verificar membresía. Registro solo no acepta. localStorage del navegador no cruza por sí solo a instalación/primer arranque nativo.

Si evento falta/no disponible: mostrar estado veraz con salida/reintento. Si no existe URL fiable en móvil, texto solo. El texto del remitente permanece en mensajería: sin nueva página personal ni nombres/ubicaciones en query. Un enlace reenviado no autoriza acceder a datos del círculo.

## Coordinación y entrega

Este archivo delimita el slice móvil y la propuesta, no sustituye el maestro de workspace ni la spec web. El plan local incluye el maestro de trabajo y slice exportable en coordinación del maestro. T001 exige publicarlos/enlazarlos desde el workspace y web antes del código cross-repo, con propietario. Pruebas de rutas, API, AASA/assetlinks, tiendas reales, SEO/robots, caché, rollout/rollback y receipts son tareas previas a depender de su release; no evidencia ya obtenida.

Propietario esperado web: chat Sismos MX sitio web, aún no contactado para esta fase. SOSFem se consultó solo como referencia de animación; no se le asignó trabajo. No cambiar backend/detector/servicios de alerta.

Validaciones futuras: npm run lint/build, links/redirects y previews WhatsApp/X, browser embebido, Android/iOS instalado/ausente/frío/caliente, expiración/error, código manual y reanudación; las herramientas de hoy no las acreditan. Rollout primero destinos compatibles/verificados, luego cliente; rollback a compartir texto/contexto público y entrada Círculos existente preservando datos e invitaciones. Enlaces compartidos conservan una salida pública útil.

## Capacidades y apertura

| Ruta | Soporte / acción prevista | Restricción |
| --- | --- | --- |
| https://sismosmx.app/event/{collapseKey} | Web pública existente | No handler nativo /event ni correlación de catálogo inferida |
| https://sismosmx.app/join/{CODE} o sismosmx://join/{CODE} | Handler actual de revisión de invitación | Confirmación y membresía posteriores en app |
| https://sismosmx.app/sismos/detalle/{token} o sismosmx://sismo/{token} | Handler de catálogo actual | Solo token auténtico, no collapseKey ni fallback local de reporte |
| sismosmx://open | Adición mínima planificada de launcher Android/iOS, no implementada | Sin path/query/fragment ni argumentos; activar app según inicio/retorno normal, sin cambiar evento ni consumir invitación. No fuerza home sobre alerta activa |

El botón de evento dice Abrir Sismos MX cuando usa open; Ver sismo en Sismos MX solo con destino de catálogo verificado. Invitar dice Revisar en Sismos MX. No detectar instalación/versión desde timer. Un launcher no compatible en un cliente antiguo deja disponible la landing y tiendas manuales, no genera éxito ni navegación forzosa. AASA no recibe /event por este plan. El esquema open debe registrarse/probarse; no se afirma soporte actual.

## Respuestas del validador existente

GET validateInviteCode?code={CODE} (servicio existente del productor); código normalizado de [ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}. Sin credenciales del usuario, sin mutaciones, no-store y timeout10s en consumidor web. Ejemplos documentales, no códigos reales:

```json
{"valid":true,"inviterName":"Nombre autorizado","expiresAt":"2026-10-30T12:00:00.000Z"}
```

```json
{"valid":false}
```

400 para sintaxis inválida según productor; 200 valid:false significa no disponible sin detalle de expired/used. 5xx, timeout, fallo de red, cuerpo malformado o respuesta no reconocida son error recuperable, nunca invitación disponible ni no disponible. No cachear datos de invitación en CDN/navegador; noindex,nofollow y OG genérico sin nombre/código. La UI no imprime errores crudos ni añade logging de códigos/URLs. En evento, mantener resultado discriminado found/notFound/error en capa web; no colapsar 5xx a ausencia ni enviar SELF_SECRET al cliente. El proveedor del evento puede no aportar magnitud/actualización: omitir campo ausente y describir estado, nunca copiar datos del fixture.

Tiendas: Android package com.oscar.sismos_v2; App Store id6473684021. Verificar destinos al publicar; eliminar placeholder id1234567890 y timers. Sin aceptación/reportes en navegador, clipboard reads, fingerprinting o promesa de deferred link.
