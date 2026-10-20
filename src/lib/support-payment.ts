/** Public hosted checkout only. Company ownership and live mode must be verified before configuration. */
export function supportPaymentLink(value: string | undefined) {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash || url.search) return null;
    const host = url.hostname.replace(/^www\./, "");
    const provider = host === "flutterwave.com" ? "Flutterwave" : host === "paystack.com" ? "Paystack" : null;
    const path = provider === "Flutterwave" ? /^\/(pay|donate)\/[a-zA-Z0-9_-]+\/?$/ : /^\/pay\/[a-zA-Z0-9_-]+\/?$/;
    return provider && path.test(url.pathname) ? { url: url.href, provider } : null;
  } catch {
    return null;
  }
}
