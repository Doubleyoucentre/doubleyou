# Hall of Fame entry

The native `/hall-of-fame` page is reachable from desktop/mobile navigation and Footer. It keeps the company shell and existing giving flow. No invented profiles, totals, programmes or payment-success claims.

The homepage also has a prominent Hall of Fame entry directly before the existing bank-transfer giving section. Both giving choices remain easy to find; existing account numbers, names and instructions are unchanged. The new entry links to `/hall-of-fame` and separately to `/#give`. Repeating the same root hash also repositions the target below the fixed header.

Until the independently accepted Hall release is ready, Contribute Now / Join the Hall of Fame use existing `/#give`. Already-published giving instructions remain unchanged; transfers are not automatically verified or converted into Hall recognition. Root hash navigation follows bounded lazy-layout changes, stops on visitor scrolling, and positions the target below the fixed header. Footer links also work from the new route.

After reviewed payment/profile acceptance and production authorization, set public `VITE_HALL_OF_FAME_ORIGIN` to the exact approved HTTPS origin and `VITE_HALL_OF_FAME_READY=true`. Development-preview, localhost, credentialed and path-bearing URLs are rejected; otherwise existing giving remains the destination. Values are public links, not provider credentials.

Hall remains separately deployable: no duplicated backend/admin code, iframe, router transplant, global CSS or secret forwarding. No cookie/capability passed through referral links. Standalone verification/ownership remains on its own origin. No production deployment or DNS change performed by this PR.

Validation: `npm run test:hall-entry`, `npm run lint`, `npm run build`, `npm run test:browser`. The browser suite uses a new headless Chrome context on localhost only, blocking external traffic. It checks five viewport widths, CTA/footer giving entry, direct refresh, history navigation, Escape/focus restoration, no overflow, no invented/sample copy, and computed CTA contrast. It never operates a user browser profile or performs a transfer.

Delivered by JeremiahAlayo with CyberEdify (https://github.com/CyberEdify), alongside Doubleyou Centre.
