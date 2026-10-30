import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hallContribution } from '../src/features/hall-of-fame/contribution.ts'
import { PUBLIC_SUPPORT_PAYMENT_URL, supportPaymentUrl } from '../src/lib/public-support.ts'

test('public company page is the default, while overrides and explicit pause remain available', () => {
  assert.equal(supportPaymentUrl(undefined), PUBLIC_SUPPORT_PAYMENT_URL)
  assert.equal(supportPaymentUrl('  '), PUBLIC_SUPPORT_PAYMENT_URL)
  assert.equal(supportPaymentUrl(' https://flutterwave.com/pay/TEST_ONLY '), 'https://flutterwave.com/pay/TEST_ONLY')
  assert.equal(supportPaymentUrl('disabled'), undefined)
  assert.deepEqual(hallContribution(undefined, 'false', supportPaymentUrl(undefined)), { href: PUBLIC_SUPPORT_PAYMENT_URL, kind: 'hosted' })
  assert.deepEqual(hallContribution(undefined, 'false', supportPaymentUrl('disabled')), { href: '/#give', kind: 'bank' })
})

// Format fixtures only: never configured in production or requested over a network.
const hosted = 'https://flutterwave.com/pay/TEST_ONLY'
test('verified hosted-link configuration works while full API release stays disabled', () => {
  assert.deepEqual(hallContribution(undefined, 'false', hosted), { href: hosted, kind: 'hosted' })
  assert.deepEqual(hallContribution('https://hall.example.org', 'false', hosted), { href: hosted, kind: 'hosted' })
})
test('unsafe or absent hosted destination keeps existing bank support available', () => {
  for (const value of [undefined, '', 'http://flutterwave.com/pay/TEST_ONLY', 'https://flutterwave.com.attacker.test/pay/TEST_ONLY', 'https://checkout.flutterwave.com/v3/hosted/pay/session', `${hosted}?email=private@example.test`, 'https://paystack.com/pay/TEST_ONLY']) {
    assert.deepEqual(hallContribution(undefined, 'false', value), { href: '/#give', kind: 'bank' })
  }
})
test('a separately accepted integrated release supersedes the temporary link only with its explicit readiness gate', () => {
  assert.deepEqual(hallContribution('https://hall.example.org', 'true', hosted), { href: 'https://hall.example.org/contribute', kind: 'integrated' })
  assert.deepEqual(hallContribution('https://african-impact-hall-of-fame-preview.vercel.app', 'true', hosted), { href: hosted, kind: 'hosted' })
})
