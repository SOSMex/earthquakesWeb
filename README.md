This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## IndexNow

Set `INDEXNOW_KEY` to the site key before building and deploying. The key is 8 to 128 characters and may contain letters, numbers, and dashes. The app serves that key, as plain text, at `/<INDEXNOW_KEY>.txt` (for example `https://sismosmx.app/<INDEXNOW_KEY>.txt`).

When `/sismos/hoy` or a per-quake URL is rendered for the first time in a server process, the server POSTs those URLs to `https://api.indexnow.org/indexnow`. The same URL is not sent again by that process. A failed ping is written to the server log and does not change the page. Pings are skipped while `next build` is running.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Web Analytics and store conversion events

The root layout already mounts `SiteAnalytics` using `@vercel/analytics`.
Keep it **before page children**: SDK 1.2.2 initializes its event queue in an
effect, which must run before download/review redirect effects.

The Vercel project owner must enable **Analytics → Web Analytics** in the project
dashboard and confirm the plan supports custom events. Deploy the reviewed change,
then verify page views for `/`, `/descargar`, and `/calificar` and the events below.
No dashboard settings or deployments are performed by this PR.

| Event | Properties | Trigger |
| --- | --- | --- |
| `store_redirect` | `route`, `platform`, `store`, optional UTM fields | Before an actual automatic `/descargar` or `/calificar` navigation attempt |
| `store_click` | Same, plus `placement` | Store anchors on home, download/review fallbacks, referral page and shared banners |

Platforms: `android`, `ios`, `desktop` (includes unknown browsers).
Stores: `play`, `app_store`. Placements: `hero`, `download_section`,
`download_fallback`, `review_fallback`, `referral`, `smart_banner`, `sticky_bar`.
UTM fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, read from
the current URL at the time of the event (no persisted attribution). Only the
first value is considered; empty/unsafe values are omitted. Labels support letters,
digits, spaces, underscores and hyphens, up to 100 characters, with at least one
letter. Campaign operators must never include personal information in labels.
These analytics restrictions do not change the existing store attribution URLs.

Private routes are normalized to `/invite/[code]`, `/join/[code]`, `/event/[id]`.
Page-view URLs omit private-route queries, arbitrary query fields and fragments;
custom props never include destination URLs, codes, raw user agents or account data.
No cookies or storage are added. The existing family event remains separate.

Tracking is synchronous and best effort: failure never blocks navigation, and no
wait/timer is added. Queueing does **not** prove that Vercel received an event before
navigation; blocked or unloaded scripts may lose events. Verify live receipts
separately, using the [validation guide](.specify/specs/004-store-analytics/quickstart.md).
Run `npm run test:analytics` for payload, privacy, redirect and component checks.
See [Vercel custom events](https://vercel.com/docs/analytics/custom-events).
