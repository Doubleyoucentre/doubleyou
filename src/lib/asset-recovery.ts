/** One automatic refresh per application build and tab, never an offline reload loop. */
export function installAssetRecovery() {
  const build = document.querySelector<HTMLScriptElement>('script[type="module"][src]')?.src
  window.addEventListener('vite:preloadError', () => {
    if (!navigator.onLine || !build) return
    try {
      if (sessionStorage.getItem('doubleyouAssetRecovery') === build) return
      sessionStorage.setItem('doubleyouAssetRecovery', build)
    } catch {
      // Without durable tab storage we cannot safely bound an automatic refresh.
      return
    }
    window.location.reload()
  })
}
