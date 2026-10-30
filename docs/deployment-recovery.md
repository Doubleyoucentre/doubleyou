# Loading a page after a deployment

An already-open tab can request a lazy-loaded file from a previous release. The current hosting fallback may return HTML for a removed JavaScript file, causing an import failure. The deployed HTML already uses `must-revalidate, max-age=0`; cache policy changes alone cannot update JavaScript already running in a tab.

The entry point listens for Vite's `vite:preloadError` event before creating the router. Online tabs refresh at most once per application build, with a session-storage marker written before reloading. Offline browsers or unavailable session storage skip automatic refresh. Persistent failures display a branded reload/home fallback rather than raw router errors. Manual reload keeps the current URL; company sessions, credentials and unrelated storage are untouched.

Tabs running releases from before this recovery code need one normal/hard refresh. No cache clearing or sign-out is required. A failure to load the initial entry script itself cannot be handled by JavaScript that never loaded.

Verify against a production build, not only the development server: return HTML instead of the requested Hall module once, then persistently; also test unavailable session storage and an offline signal. Confirm one automatic retry, a stable fallback without a refresh loop, and successful manual retry after restoring the module. Keep direct Hall navigation and contribution dialogs covered at mobile, tablet and desktop sizes.

References: [Vite load error handling](https://vite.dev/guide/build#load-error-handling), [React Router error boundaries](https://reactrouter.com/how-to/error-boundary).
