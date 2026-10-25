# Medición — contrato de planificación

Wrappers existentes AnalyticsHelper/AnalyticsLogger y CircleAnalytics. No FirebaseAnalytics directo en widgets. Nuevas constantes/enums en archivos existentes; analytics nunca retrasa navegación ni altera resultado. Valores cerrados, sin texto libre ni doble instrumentación del mismo hito.

| Evento / autoridad | Resultado/valores | Dedupe y denominador |
| --- | --- | --- |
| family_entry_viewed (nuevo) | mode=guest/loading/error/none/one/multiple, source=alert | Una vez por presentación visible y modo, no build; denominador impresiones humanas instrumentadas |
| post_quake_share (nuevo) | outcome=started/success/dismissed/unavailable/unknown/failed; session=guest/linked; kind=real/drill/unknown | started una vez por tap aceptado y un resultado por intento; success es resultado del SO, nunca entrega |
| circleJourneyStarted existente | añadir CircleSource.alert; flow=create/join/report actual | Solo intención explícita, no aparición de animación |
| circleInviteCreateResult/CopyResult/ShareResult existentes | outcome/reason enums actuales | Confirmación del servicio/clipboard/hoja respectivamente; reintento es otro intento, reanudar no duplica |
| circleJoinOutcome existente | succeeded solo con membresía verificada; pending en verificación | Mantener autoridad CircleJoinService y su dedupe. No emitirlo de nuevo desde animación del emisor |
| family_member_seen (nuevo) | source=alert/circles; outcome=existing/joined | Solo transición de servidor tras baseline, una vez por incorporación en sesión; no conteo global de únicos |
| circleReportResult existente | guardado confirmado/pending/failed según servicio | Un resultado por intento de reporte; no registrar desde compartir |
| circle_event_viewed (nuevo) | source=alert/circles; outcome=shown/failed | Vista visible del estado para evento, una vez por presentación, no cada snapshot |
| Web view/open/copy (slice web) | page=event/invite; action=view/open_app/store_android/store_ios/copy; outcome=started/failed/unknown | Excluir previews/bots del denominador cuando sea comprobable; click no acredita app abierta ni instalación |

No nombres, emails, UIDs, ownerIds, códigos, direcciones, coordenadas, texto del mensaje, URLs o errores crudos en eventos nuevos. Nada de IDs de evento como labels/parameters analíticos. Source/mode/outcome/session/kind/reason son enums; nombres de eventos<=40 caracteres, valores<=100 conforme wrapper. Screen views obligatorias de pantallas tocadas: constante y logScreenView según convención, sin duplicar por rebuild. Reusar eventos existentes en lugar de duplicar guardados/incorporaciones.

Ventana de dedupe es la presentación/intento en memoria y queda explícita: sin nueva identidad persistente entre web e instalación ni matching probabilístico. El embudo objetivo es bloque visible → intención → invitación confirmada → segundo miembro confirmado → reporte explícito → consulta para el mismo evento en datos de producto autorizados; métricas agregadas de cada etapa no prueban que sean la misma pareja/evento. Para verificar SC007 usar escenario controlado de dos cuentas y recibo de prueba sin PII en analytics. Cohortes de negocio requieren análisis posterior con denominadores/release definidos; no prometer lift ni atribución de instalación.

Preservar CircleAnalytics trust_variant vigente y versionado existente; no alterar atribución del onboarding A/B. Sin Install Referrer/deferred attribution, rewards o eventos de notificación recibida inferidos de guardado.
