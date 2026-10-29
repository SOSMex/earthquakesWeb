# Implementation plan: platform download link

Branch: codex/download-route-533. Date: 2026-10-28. Spec: [spec.md](spec.md). Base: develop 71a8d90.

## Technical context
Next.js 14.1 App Router, React 18, TypeScript, Node 20+. No new runtime dependency or storage. One new public route. Client detection preserves desktop-mode iPad support; redirect starts on hydration without timers. Server builds fallback links from each request query.

## Constitution check
Ownership: this repo owns public download routing. Contracts first: [download-link.md](contracts/download-link.md). Existing decisions: docs/adr/001-store-review-link.md, docs/rfc/001-ui-ux-interactivity.md and Spec002. New ADR-002 records attribution boundaries. No API/mobile/app-association modifications, metrics, secrets or new hosting. All gates pass before and after design.

## Structure and tasks
Extract store-platform.ts with compatibility aliases in review-links.ts. Add download-links.ts pure URL builder, app/descargar/page.tsx + DownloadRedirect.tsx, tests/download-links and CI command. Preserve /calificar components. Tests before implementation; existing family/review contracts remain unchanged.

## Rollout and rollback
Draft PR only. Before publication, obtain optional APP_STORE_PROVIDER_TOKEN from an App Store Connect campaign link (public attribution identifier, not a secret), configure the server environment, validate preview on Android/iPhone/iPad and confirm campaign attribution independently. Missing pt must not block installation. After publication verify the production URL before Oscar approves replacing either ad URL. Rollback removes the new route/change to ads; existing review route remains valid.

## Validation
npm run test:download, test:review, test:family, lint, typecheck and build; browser emulation with intercepted store navigation, desktop/no-JS anchors and metadata. No external store navigation required for automation. Separate emulator/browser evidence from physical-device/store/Analytics evidence.
