import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const destination = 'https://flutterwave.com/pay/TEST_ONLY'
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`homepage popup and support section share the hosted link at ${width}px`, async ({ context, page, baseURL }) => {
    await page.setViewportSize({ width, height: 900 })
    await context.route('**/*', route => new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort())
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    const intro = page.getByRole('dialog', { name: /Be part of the story/ })
    await expect(intro).toBeVisible()
    const payment = intro.getByRole('link', { name: 'Contribute via Flutterwave' })
    await expect(payment).toHaveAttribute('href', destination)
    await expect(payment).toHaveAttribute('target', '_blank')
    await expect(payment).toHaveAttribute('rel', 'noopener noreferrer')
    expect(await intro.evaluate(element => {
      const rect = element.getBoundingClientRect()
      return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight
    })).toBe(true)
    await expect(intro.getByRole('link', { name: 'Explore the Hall of Fame' })).toHaveAttribute('href', '/hall-of-fame')
    await intro.getByRole('button', { name: 'Close impact introduction' }).click()
    await page.goto('/#give')
    const support = page.locator('#give').getByRole('link', { name: 'Contribute via Flutterwave' })
    await expect(support).toBeVisible()
    await expect(support).toHaveAttribute('href', destination)
    await expect(support).toHaveAttribute('target', '_blank')
    await expect(support).toHaveAttribute('rel', 'noopener noreferrer')
    expect(await support.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    expect(errors).toEqual([])
  })

  test(`temporary Hall CTA and external navigation at ${width}px`, async ({ context, page, baseURL }) => {
    await page.setViewportSize({ width, height: 900 })
    await context.route('**/*', route => {
      const url = route.request().url()
      if (url === destination) return route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>External navigation fixture</title><h1>Navigation fixture only</h1><p>This does not simulate payment processing.</p>' })
      return new URL(url).origin === baseURL ? route.continue() : route.abort()
    })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/hall-of-fame')
    const cta = page.getByRole('link', { name: 'Contribute Now', exact: true }).first()
    await expect(cta).toHaveAttribute('href', destination)
    await expect(cta).toHaveAttribute('target', '_blank')
    await expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(cta).toHaveAttribute('referrerpolicy', 'no-referrer')
    await expect(cta).toHaveAccessibleDescription(/Temporary contribution option.*choose your amount on Flutterwave.*new tab.*reviewed separately/)
    await cta.focus()
    expect(await cta.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none')
    expect(await cta.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    if (width === 390 || width === 1440) {
      await mkdir('.local-audit/hosted-contribution', { recursive: true })
      await page.screenshot({ path: `.local-audit/hosted-contribution/hall-${width}.png` })
    }
    const popup = page.waitForEvent('popup')
    await page.keyboard.press('Enter')
    const checkout = await popup
    await checkout.waitForLoadState('domcontentloaded')
    await expect(checkout).toHaveURL(destination)
    expect(await checkout.evaluate(() => window.opener === null)).toBe(true)
    await expect(page).toHaveURL(/\/hall-of-fame$/)
    await checkout.close()
    await page.reload()
    await expect(cta).toHaveAttribute('href', destination)
    await expect(page.locator('#hall-recognition')).toContainText('Public recognition is optional')
    expect(errors).toEqual([])
  })
}
