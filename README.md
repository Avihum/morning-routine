# Morning Routine PWA

An iPad-first Hebrew morning routine app built with React, TypeScript, Vite, and `vite-plugin-pwa`.

## Development

```bash
npm install
npm run dev
```

Create a production build with `npm run build`, preview it with `npm run preview`, and run the test suite with `npm test`.

## Install on iPad

Serve the production build over HTTPS, open it in Safari, tap Share, then choose **Add to Home Screen**. The service worker caches the application after its first successful load so it can open offline.

## Local data

Completed tasks and parent settings are stored only in the browser's local storage. Completed tasks reset automatically on the first launch of a new local calendar day. Parent settings remain in place.

## Icons

The placeholder app icons are in `public/icons`. Replace both files with production artwork using the same names and dimensions. For the broadest iOS compatibility, exported PNG versions can be substituted and the paths and MIME types updated in `vite.config.ts` and `index.html`.
