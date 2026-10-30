import { test, expect } from '@playwright/test'

for (const mode of ['transient', 'persistent', 'storage-blocked', 'offline'] as const) {
  test(`failed deployed route module recovers safely: ${mode}`, async ({ context, page, baseURL }) => {
    let failures = 0
    let documents = 0
    let blocked = true
    if (mode === 'storage-blocked') await context.addInitScript(() => {
      Object.defineProperty(window, 'sessionStorage', { get: () => { throw new DOMException('Unavailable', 'SecurityError') } })
    })
    if (mode === 'offline') await context.addInitScript(() => { Object.defineProperty(navigator, 'onLine', { get: () => false }) })
    await context.route('**/*', route => {
      const request = route.request()
      const url = new URL(request.url())
      if (url.origin !== baseURL) return route.abort()
      if (request.isNavigationRequest() && url.pathname === '/hall-of-fame') documents++
      if (mode === 'transient' && documents > 1) blocked = false
      if (/\/HallOfFamePage-[^/]+\.js$/.test(url.pathname) && blocked) {
        failures++
        // Reproduce the old asset returning the SPA HTML instead of a JavaScript module.
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Previous asset unavailable</title>' })
      }
      return route.continue()
    })
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/hall-of-fame')
    if (mode === 'transient') {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(/African.*Impact.*Hall of.*Fame/)
      expect(documents).toBe(2)
      expect(failures).toBeGreaterThanOrEqual(1)
    } else {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Let’s reload this page')
      await expect(page.locator('body')).not.toContainText(/Unexpected Application Error|Hey developer|TypeError:/)
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
      const expected = mode === 'persistent' ? 2 : 1
      await page.waitForTimeout(1000)
      expect(documents).toBe(expected)
      blocked = false
      await page.getByRole('button', { name: 'Reload page' }).click()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(/African.*Impact.*Hall of.*Fame/)
      expect(documents).toBe(expected + 1)
    }
  })
}

test('QR popup fits a short mobile screen and restores focus after close', async ({ context, page, baseURL }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort())
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/hall-of-fame')
  const cta = page.getByRole('link', { name: 'Contribute Now', exact: true }).first()
  await cta.click()
  const dialog = page.getByRole('dialog', { name: 'Contribute to African impact' })
  await expect(dialog).toBeVisible()
  expect(await dialog.evaluate(element => {
    const rect = element.getBoundingClientRect()
    return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight
  })).toBe(true)
  await dialog.getByRole('link', { name: 'Continue to Flutterwave' }).scrollIntoViewIfNeeded()
  await expect(dialog.getByRole('link', { name: 'Continue to Flutterwave' })).toBeVisible()
  await dialog.getByRole('button', { name: 'Close contribution options' }).click()
  await expect(dialog).not.toBeVisible()
  await expect(cta).toBeFocused()
})
