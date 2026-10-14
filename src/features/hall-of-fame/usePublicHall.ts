import { useEffect, useState } from 'react'
import { emptySnapshot, loadPublicHall, publicHallEndpoint } from './public-resource'

const endpoint = publicHallEndpoint(import.meta.env.VITE_HALL_OF_FAME_PUBLIC_API)
export function usePublicHall() {
  const [data, setData] = useState(emptySnapshot)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(endpoint ? 'loading' : 'ready')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (!endpoint) return
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 12_000)
    let active = true
    loadPublicHall(endpoint, controller.signal).then(snapshot => {
      if (active) { setData(snapshot); setStatus('ready') }
    }).catch(() => { if (active) { setData(emptySnapshot()); setStatus('error') } }).finally(() => window.clearTimeout(timer))
    return () => { active = false; window.clearTimeout(timer); controller.abort() }
  }, [attempt])
  return { data, status, retry: () => { setStatus('loading'); setAttempt(value => value + 1) } }
}
