import { emptySnapshot, parsePublicSnapshot, type HallOfFameSnapshot } from './public-contract.ts'

/** An optional public read endpoint. No credentials or financial/admin APIs. */
export function publicHallEndpoint(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || /^(localhost|127\.|\[::1\])/.test(url.hostname) || url.hostname.endsWith('.localhost')) return null
    return url.href
  } catch { return null }
}

export async function loadPublicHall(endpoint: string, signal: AbortSignal, request: typeof fetch = fetch): Promise<HallOfFameSnapshot> {
  const response = await request(endpoint, { signal, credentials: 'omit', cache: 'no-store', headers: { Accept: 'application/json' } })
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Public data is unavailable.')
  const size = response.headers.get('content-length')
  if (size && Number(size) > 2_000_000) throw new Error('Public data is unavailable.')
  const body = await response.text()
  if (body.length > 2_000_000) throw new Error('Public data is unavailable.')
  const snapshot = parsePublicSnapshot(JSON.parse(body))
  // Approved relative media belongs to the public API's origin, not the referring site.
  const asset = (value: string | undefined) => value ? new URL(value, endpoint).href : ''
  return { ...snapshot, contributors: snapshot.contributors.map(person => ({ ...person, photoUrl: asset(person.photoUrl) })), stories: snapshot.stories.map(story => ({ ...story, imageUrl: asset(story.imageUrl) })) }
}

export { emptySnapshot }
