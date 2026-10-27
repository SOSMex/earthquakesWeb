# Implementation Plan: Enlace de calificación

**Branch**: codex/store-review-link | **Date**: 2026-10-27 | **Spec**: [spec.md](spec.md)

## Summary

Ruta /calificar con enlaces oficiales renderizados en servidor y selección en cliente; reutilizar IDs de src/config/stores.ts.

## Technical Context

TypeScript, Next.js 14 App Router, React 18 y Tailwind. Sin dependencias nuevas ni datos de backend; sessionStorage sólo limita el intento automático por pestaña. UA y maxTouchPoints detectan iPadOS. Página estática sin consultar APIs sísmicas.

## Constitution Check

Web es propietario de URL/SEO/fallback; transporte fuera de alcance. Contrato definido antes del código en [review-link.md](contracts/review-link.md). Sin nuevos datos personales ni eventos analytics. Sin cambios a AASA/assetlinks. Las pruebas web no acreditan reseña instalada.

## Project Structure

- src/config/stores.ts: destinos derivados de IDs existentes.
- src/lib/review-links.ts: clasificación y destino puro.
- src/app/calificar/page.tsx y ReviewRedirect.tsx: fallback e intento automático.
- tests/review-links/: contratos de plataformas y tiendas.

## Sismos MX Design Addenda

### Existing Decisions Reviewed

AGENTS.md, CLAUDE.md, constitución; docs/rfc/001-ui-ux-interactivity.md (mapa, fuera de alcance); asociaciones AASA/assetlinks; stores y useStoreUrl; RFC-058 local y copia de coordinación spec025. Decisión en docs/adr/001-store-review-link.md.

### Rollout / Rollback

Publicar ruta antes de cambiar campañas; verificar que la app no captura /calificar y que App Store abre reseñas. Si falla, retirar URL de nuevos mensajes, desactivar apertura automática y conservar página de enlaces para mensajes ya distribuidos. No enviar push desde este cambio.

### Verification Matrix

- npm run test:review y npm run test:family: contratos/regresión.
- npm run lint y npm run build: calidad y compilación.
- GET local y navegación web con UA Android/iPhone/iPad/desktop, sin JS y parámetros extra.
- Tiendas reales Android/iOS, URL publicada y transporte iOS: registrar por separado; pendientes antes de campaña.

## Complexity Tracking

Sin violaciones, servicios ni dependencias nuevas.
