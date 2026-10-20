import test from "node:test";
import assert from "node:assert/strict";
import { supportPaymentLink } from "../src/lib/support-payment.ts";

// Destination-format fixtures only. These are never production payment links or requested over the network.
test("unconfigured payment has no fabricated checkout destination", () => {
  for (const input of [undefined, "", " ", "not-a-url"]) assert.equal(supportPaymentLink(input), null);
});

test("only supported provider-hosted payment pages produce a labelled destination", () => {
  for (const [host, path, provider] of [
    ["paystack.com", "pay", "Paystack"],
    ["flutterwave.com", "pay", "Flutterwave"],
    ["www.flutterwave.com", "donate", "Flutterwave"],
  ]) {
    const url = `https://${host}/${path}/TEST_ONLY`;
    assert.deepEqual(supportPaymentLink(url), { url, provider });
  }
});

test("unsafe, lookalike, dashboard, transient or personalised destinations stay disabled", () => {
  for (const input of [
    "javascript:alert(1)", "http://paystack.com/pay/TEST_ONLY",
    "https://paystack.com.attacker.test/pay/TEST_ONLY", "https://attacker.test/pay/TEST_ONLY",
    "https://sandbox.flutterwave.com/pay/TEST_ONLY", "https://paystack.com/",
    "https://paystack.com/dashboard", "https://checkout.paystack.com/TEST_ONLY",
    "https://user:secret@paystack.com/pay/TEST_ONLY", "https://paystack.com:8443/pay/TEST_ONLY",
    "https://paystack.com/pay/TEST_ONLY?email=private@example.test", "https://paystack.com/pay/TEST_ONLY#fragment",
  ]) assert.equal(supportPaymentLink(input), null, input);
});
