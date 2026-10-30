import { useEffect, useRef } from 'react'

export default function RouteLoadError() {
  const main = useRef<HTMLElement>(null)
  useEffect(() => { main.current?.focus() }, [])
  return <main ref={main} tabIndex={-1} className="min-h-screen flex items-center justify-center px-6 py-16 outline-none">
    <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 sm:p-10" aria-labelledby="page-load-title">
      <img src="/ddd.jpg" width={64} height={64} alt="Doubleyou Centre" className="mb-6 rounded-xl" />
      <h1 id="page-load-title" className="text-3xl font-bold tracking-tight">Let’s reload this page</h1>
      <p className="mt-4 text-slate-600" role="alert">We couldn’t finish loading the page. Check your connection and try again.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" onClick={() => window.location.reload()} className="min-h-12 rounded-full bg-[#0E1B2E] px-6 py-3 font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-green-800">Reload page</button>
        <a href="/" className="min-h-12 rounded-full border border-slate-300 px-6 py-3 font-bold focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-green-800">Back to home</a>
      </div>
    </section>
  </main>
}
