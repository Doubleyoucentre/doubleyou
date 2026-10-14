import type { PublicContributor, ImpactStatistic, MapCountry, Story } from './types.ts'

export type Money = { amountMinor: number; currency: string }
export type HallOfFameSnapshot = {
  source: 'verified' | 'awaiting-verified-data'
  contributors: PublicContributor[]; statistics: ImpactStatistic[]; countries: MapCountry[]; stories: Story[]
}
export const emptySnapshot = (): HallOfFameSnapshot => ({ source: 'awaiting-verified-data', contributors: [], statistics: [], countries: [], stories: [] })
export function isMoney(value: unknown): value is Money {
  if (!value || typeof value !== 'object') return false
  const v = value as Money
  return Number.isSafeInteger(v.amountMinor) && v.amountMinor > 0 && /^[A-Z]{3}$/.test(v.currency)
}
export function formatMoney(value: Money) {
  const formatter = new Intl.NumberFormat('en', { style: 'currency', currency: value.currency })
  return formatter.format(value.amountMinor / 10 ** (formatter.resolvedOptions().maximumFractionDigits ?? 2))
}
const text = (v: unknown, max = 500) => typeof v === 'string' && v.length <= max
const nonnegative = (v: unknown) => Number.isSafeInteger(v) && Number(v) >= 0
const categories = ['individuals','african-diaspora','organizations','friends-of-africa']
export function approvedAsset(value: unknown): string {
  if (!text(value, 2048) || !value || String(value).includes('placeholder')) return ''
  if (String(value).startsWith('/') && !String(value).startsWith('//') && !String(value).includes('\\')) {
    const u = new URL(String(value),'https://approved-assets.example')
    return /^\/(assets|brand|media|portraits)\//.test(u.pathname)||/^\/api\/media\/[a-f0-9-]{36}$/.test(u.pathname) ? `${u.pathname}${u.search}` : ''
  }
  try { const u = new URL(String(value)); return u.protocol === 'https:' && !u.username && !u.password && !/^(localhost|127\.|\[::1\])/.test(u.hostname) && !u.hostname.endsWith('.localhost') ? u.href : '' } catch { return '' }
}
/** Whitelist publication fields. Financial identity, contact details and capabilities never enter a public DTO. */
export function parsePublicSnapshot(value: unknown): HallOfFameSnapshot {
  if (!value || typeof value !== 'object') throw new Error('Invalid public data.')
  const v = value as Record<string, unknown>
  if (v.source === 'awaiting-verified-data' && ['contributors','statistics','countries','stories'].every(k => Array.isArray(v[k]) && (v[k] as unknown[]).length === 0)) return emptySnapshot()
  if (v.source !== 'verified' || !['contributors','statistics','countries','stories'].every(k => Array.isArray(v[k]) && (v[k] as unknown[]).length <= 1000)) throw new Error('Unverified public data.')
  const contributors = (v.contributors as Record<string,unknown>[]).map(c => {
    if (!c || !['id','name'].every(k => text(c[k]) && String(c[k]).trim()) || String(c.id).startsWith('sample-')) throw new Error('Invalid public contributor.')
    const result: PublicContributor = { id: String(c.id), name: String(c.name) }
    for (const key of ['country','quote','supportLabel','initiativeId','profession','bio'] as const) if (c[key] !== undefined) { if (!text(c[key],key==='bio'?600:500)) throw new Error('Invalid public field.'); result[key] = String(c[key]) }
    if (c.category !== undefined) { if (!categories.includes(String(c.category))) throw new Error('Invalid public category.'); result.category = c.category as PublicContributor['category'] }
    if (c.amountMinor !== undefined || c.currency !== undefined) {
      if (!isMoney({ amountMinor: c.amountMinor, currency: c.currency })) throw new Error('Invalid public money.')
      result.amountMinor = Number(c.amountMinor); result.currency = String(c.currency); result.amountLabel = formatMoney(c as unknown as Money)
    }
    result.photoUrl = approvedAsset(c.photoUrl)
    return result
  })
  const statistics = (v.statistics as Record<string,unknown>[]).map(s => {
    if (!s || !text(s.id,80) || !text(s.label,150) || (!nonnegative(s.value) && !text(s.value,80))) throw new Error('Invalid public statistic.')
    return { id: String(s.id), label: String(s.label), value: s.value as number|string, ...(text(s.prefix,10) ? { prefix: String(s.prefix) } : {}) }
  })
  const countries = (v.countries as Record<string,unknown>[]).map(c => {
    if (!c || !/^[A-Z]{2}$/.test(String(c.code)) || !text(c.name,100) || typeof c.latitude !== 'number' || Math.abs(c.latitude) > 90 || !Number.isFinite(c.latitude) || typeof c.longitude !== 'number' || !Number.isFinite(c.longitude) || Math.abs(c.longitude) > 180 || !nonnegative(c.contributorCount)) throw new Error('Invalid country data.')
    return { code: String(c.code), name: String(c.name), latitude: c.latitude, longitude: c.longitude, contributorCount: Number(c.contributorCount) }
  })
  const stories = (v.stories as Record<string,unknown>[]).map(s => {
    if (!s || !['id','slug','headline','summary','category','imageAlt'].every(k => text(s[k])) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(s.slug)) || !/^\d{4}-\d{2}-\d{2}$/.test(String(s.date)) || Number.isNaN(Date.parse(String(s.date))) || new Date(String(s.date)).toISOString().slice(0,10) !== s.date) throw new Error('Invalid published story.')
    const strings = (a: unknown) => Array.isArray(a) && a.length <= 30 && a.every(x => text(x,4000)) ? a as string[] : []
    return { id: String(s.id), slug: String(s.slug), headline: String(s.headline), summary: String(s.summary), category: String(s.category), date: String(s.date), imageUrl: approvedAsset(s.imageUrl), imageAlt: String(s.imageAlt), body: strings(s.body), highlights: strings(s.highlights), ...(text(s.readTime,50) ? { readTime: String(s.readTime) } : {}) }
  })
  return { source: 'verified', contributors, statistics, countries, stories }
}
