# Support and hosted payment link

The homepage introduces the African Impact Hall of Fame in an accessible popup. Its Hall of Fame action uses `/hall-of-fame`; its support action uses the existing `/#give` bank-transfer section until a company-owned hosted checkout is configured. Existing ASIP information stays at `/african-student-impact-program`, including the closed application status.

Set the **public** build variable `VITE_SUPPORT_PAYMENT_URL` in the existing Vercel `doubleyou` project to the exact verified live company payment-page URL, then rebuild/redeploy. The variable is blank by default. No secret key, API integration or new payment account is needed for a hosted link.

Supported formats are HTTPS Flutterwave payment/donation pages on `flutterwave.com` under `/pay/` or `/donate/`, and Paystack payment pages on `paystack.com` under `/pay/`. Provider dashboard URLs, temporary transaction sessions, credential-bearing URLs, unknown domains, query strings and fragments are rejected. The bare published company page URL is required. URL validation checks the destination format; the account owner must separately confirm the page belongs to Doubleyou, is in live mode and settles to the intended company account.

When valid, the popup and support section show “Contribute via Flutterwave” or “Contribute via Paystack”. The link opens the provider-hosted page in a new tab. Payment processing stays with that provider. A hosted payment alone does not publish a Hall of Fame profile or prove payment completion; the existing verification/consent/approval workflow remains separate.

Until a verified URL is supplied, there is no direct online-payment button or fabricated checkout destination. Visitors can explore the Hall of Fame and use the existing bank-transfer details. Test the configured link by checking the actual hosted page and company name without submitting a payment.

Provider references: [Paystack payment pages](https://paystack.com/docs/api/page/), [Flutterwave payment links](https://flutterwave.com/us/blog/useflutterwave-payment-links-to-collect-payments-easily-and-securely).
