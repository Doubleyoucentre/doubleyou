import { supportPaymentLink } from '../../lib/support-payment.ts'
import { hallOfFameDestination } from './destination.ts'

/** Public links only. Hosted checkout never enables the separate API release. */
export function hallContribution(standaloneOrigin: string | undefined, integratedReady: string | undefined, paymentUrl: string | undefined) {
  const origin = hallOfFameDestination(standaloneOrigin, integratedReady)
  if (origin) return { href: `${origin}/contribute`, kind: 'integrated' as const }
  const hosted = supportPaymentLink(paymentUrl)
  if (hosted?.provider === 'Flutterwave') return { href: hosted.url, kind: 'hosted' as const }
  return { href: '/#give', kind: 'bank' as const }
}
