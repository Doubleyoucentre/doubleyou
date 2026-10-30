import { defineConfig } from '@playwright/test'

// This destination is a browser-navigation fixture only; never a public payment URL.
export default defineConfig({
  testDir: './tests/hosted-browser', workers: 1, timeout: 45000,
  outputDir: '.local-audit/hosted-contribution/browser-results', reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5216', channel: 'chrome', headless: true },
  webServer: {
    command: 'npm run build -- --outDir .local-audit/hosted-contribution/fixture-dist && npm run preview -- --host 127.0.0.1 --port 5216 --strictPort --outDir .local-audit/hosted-contribution/fixture-dist',
    url: 'http://127.0.0.1:5216', reuseExistingServer: false,
    timeout: 180000,
    env: { VITE_HALL_OF_FAME_READY: 'false', VITE_SUPPORT_PAYMENT_URL: 'https://flutterwave.com/pay/TEST_ONLY' },
  },
})
