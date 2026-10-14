import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptySnapshot, parsePublicSnapshot } from '../src/features/hall-of-fame/public-contract.ts'
import { loadPublicHall, publicHallEndpoint } from '../src/features/hall-of-fame/public-resource.ts'
import { filterContributors } from '../src/features/hall-of-fame/filterContributors.ts'

const endpoint = 'https://published.example.test/api/hall-of-fame'
const signal = () => new AbortController().signal
const fixture = () => ({ source: 'verified', statistics: [], countries: [], stories: [], contributors: [{ id: 'test-public-id', name: 'TEST Impact Builder', country: 'Nigeria', profession: 'Engineer', category: 'individuals', photoUrl: '/portraits/test.svg', amountMinor: 1000, currency: 'USD', email: 'private@example.test', ownershipToken: 'TEST-PRIVATE', providerTransactionId: 'TEST-INTERNAL' }] })
const json = (value: unknown) => new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json' } })

test('public endpoint permits only explicitly configured HTTPS without credentials or query tokens', () => {
  assert.equal(publicHallEndpoint(undefined), null)
  for (const value of ['http://published.example.test', 'https://localhost/api', 'https://127.0.0.1/api', 'https://user:secret@published.example.test/api', `${endpoint}?token=hidden`, `${endpoint}#secret`]) assert.equal(publicHallEndpoint(value), null)
  assert.equal(publicHallEndpoint(endpoint), endpoint)
})
test('no configured records remains an honest empty snapshot, not fabricated totals', () => {
  assert.deepEqual(emptySnapshot(), { source: 'awaiting-verified-data', contributors: [], statistics: [], countries: [], stories: [] })
  assert.throws(() => parsePublicSnapshot({ ...fixture(), source: 'sample' }))
})
test('public contract strips contact and payment identity; money uses minor units', async () => {
  let options: RequestInit | undefined
  const request: typeof fetch = async (_input, init) => { options = init; return json(fixture()) }
  const result = await loadPublicHall(endpoint, signal(), request)
  assert.equal(result.contributors[0].amountLabel, '$10.00')
  assert.equal(result.contributors[0].photoUrl, 'https://published.example.test/portraits/test.svg')
  assert.equal(options?.credentials, 'omit')
  assert.equal(options?.cache, 'no-store')
  assert.doesNotMatch(JSON.stringify(result), /private@example|TEST-PRIVATE|TEST-INTERNAL/)
})
test('invalid currency/amount or malformed snapshot fails instead of displaying invented figures', () => {
  const invalid = fixture(); invalid.contributors[0].amountMinor = -1
  assert.throws(() => parsePublicSnapshot(invalid))
  assert.throws(() => parsePublicSnapshot({ ...fixture(), countries: [{ code: 'NG', name: 'Nigeria', latitude: Infinity, longitude: 8, contributorCount: 1 }] }))
})
test('HTTP, HTML, malformed JSON and oversized responses never become fallback records', async () => {
  for (const response of [new Response('unavailable', { status: 503 }), new Response('<html/>', { headers: { 'content-type': 'text/html' } }), new Response('{', { headers: { 'content-type': 'application/json' } }), new Response('{}', { headers: { 'content-type': 'application/json', 'content-length': '2000001' } })]) {
    await assert.rejects(loadPublicHall(endpoint, signal(), async () => response))
  }
})
test('retained contributor filter searches profession/country and stable category IDs', () => {
  const people = parsePublicSnapshot(fixture()).contributors
  assert.equal(filterContributors(people, 'engineer', 'individuals').length, 1)
  assert.equal(filterContributors(people, 'nigeria', 'all').length, 1)
  assert.equal(filterContributors(people, '', 'organizations').length, 0)
  assert.equal(filterContributors(people, 'missing', 'all').length, 0)
})
