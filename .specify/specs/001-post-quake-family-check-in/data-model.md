# Data model — web001
Sin DB/schema/persistencia nueva.
- InvitationValidation: loading | available(inviterName?,expiresAt) | unavailable | error(retryable). Código solo route/intención/ayuda; no nueva telemetría. valid:false no aporta razón expired/used. Campos true inválidos => error, sin mostrar nombre no autorizado.
- PublicEventResult: found(publicDTO) | notFound | error(retryable). DTO actual collapseKey,eventType,intensity,location,dateUtc,etas y opcionales de epicentro; campos extra solo si productor real los agrega. Fecha del evento no se etiqueta como última actualización por suposición.
- OpenIntent: invite(code) | catalog(actualToken) | generic. Construcción URI sin host/secret arbitrario. generic sismosmx://open sin argumentos, no mismo evento prometido.
- UI: visibilidad/foco/código expandido/copy outcome efímeros. Entrada/salida cancelan efectos; reduced motion muestra composición estática. No storage que prometa deferred link.
Autoridad: web informa y solicita apertura, app confirma identidad/consentimiento/membresía/reporte. Click no es entrega/instalación. Cache: no-store invitación; público evento con política acotada existente y errores fuera de cache de ausencia.
