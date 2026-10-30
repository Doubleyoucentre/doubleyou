// Public company payment page supplied by Doubleyou; this is not an API credential.
export const PUBLIC_SUPPORT_PAYMENT_URL = 'https://flutterwave.com/pay/eejh5o2ppmas'

/** Build-time override; `disabled` pauses hosted payments and restores bank support. */
export function supportPaymentUrl(override: string | undefined) {
  const value = override?.trim()
  return value === 'disabled' ? undefined : value || PUBLIC_SUPPORT_PAYMENT_URL
}
