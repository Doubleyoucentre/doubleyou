import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import type { Locator } from '@playwright/test';

async function captureSection(section: Locator, path: string) {
  for (const item of await section.locator('[style*="opacity"]').all()) {
    await item.scrollIntoViewIfNeeded();
    await expect.poll(() => item.evaluate(element => +getComputedStyle(element).opacity)).toBe(1);
  }
  await section.screenshot({ path });
}

const organisations = ['National Blood Service Agency', 'Lagos State Blood Transfusion Service', 'Nigerian Red Cross Society'];
test.beforeEach(async ({ context, baseURL }) => {
  await context.route('**/*', route => new URL(route.request().url()).origin === baseURL ? route.continue() : route.request().url() === 'https://published.example.test/api/hall-of-fame' ? route.fulfill({ json: { source: 'awaiting-verified-data', contributors: [], statistics: [], countries: [], stories: [] } }) : route.abort());
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`ASIP, partner cards, Join heading, popup and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    const intro = page.getByRole('dialog', { name: /Be part of the story/ });
    await expect(intro).toBeVisible();
    await expect(intro).toContainText('African Impact Hall of Fame');
    await expect(intro).not.toContainText(/blood|donation drive|upcoming event/i);
    await expect(intro.getByRole('link', { name: 'Explore the Hall of Fame' })).toHaveAttribute('href', '/hall-of-fame');
    await expect(intro.getByRole('link', { name: 'Support our work' })).toHaveAttribute('href', '/#give');
    await expect(intro.locator('a[href*="flutterwave"], a[href*="paystack"]')).toHaveCount(0);
    expect(await intro.evaluate(element => {
      const rect = element.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
    })).toBe(true);
    await mkdir('.local-audit/website-updates', { recursive: true });
    if ([390, 1440].includes(width)) await page.screenshot({ path: `.local-audit/website-updates/popup-${width}.png` });
    await intro.getByRole('button', { name: 'Close impact introduction' }).click();
    await expect(intro).not.toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');

    const program = page.locator('#fellowship');
    await program.scrollIntoViewIfNeeded();
    await expect(program.getByRole('heading', { level: 2 })).toHaveText('African Student Impact Program');
    await expect(program).toContainText('Applications for the August 2026 cohort are closed.');
    if ([390, 1440].includes(width)) await captureSection(program, `.local-audit/website-updates/asip-section-${width}.png`);
    await program.getByRole('link', { name: 'View ASIP program' }).click();
    await expect(page).toHaveURL(/\/african-student-impact-program$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Applications are now closed');
    await expect(page.locator('main')).toContainText('six-month');
    await expect(page.locator('main iframe, main form')).toHaveCount(0);

    await page.goto('/#partners');
    const partners = page.locator('#partners');
    await expect(partners.getByRole('heading', { name: 'Health & Social Impact' })).toBeVisible();
    for (const name of organisations) {
      await expect(partners.getByText(name, { exact: true })).toHaveCount(1);
      await expect(page.locator('#blood-drive').getByText(name, { exact: true })).toHaveCount(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    await expect(page.locator('body')).not.toContainText(/Campus Impact|Campus Fellows|Jela|Haima/);
    if ([390, 1440].includes(width)) await captureSection(partners, `.local-audit/website-updates/partners-${width}.png`);

    await page.goto('/#give');
    const join = page.locator('#give').getByRole('heading', { name: 'Join Us in Building the Future', exact: true });
    await expect(join).toBeVisible();
    await expect(page.locator('#give')).not.toContainText(/help us|your donation/i);
    await expect(page.locator('#give').getByText('Bank Transfer', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    expect(await join.evaluate(element => {
      const title = element.getBoundingClientRect();
      const chip = element.previousElementSibling!.getBoundingClientRect();
      return title.left >= 0 && title.right <= innerWidth && chip.bottom <= title.top;
    })).toBe(true);
    if ([390, 1440].includes(width)) await captureSection(page.locator('#give'), `.local-audit/website-updates/support-${width}.png`);
    await page.locator('#give').getByRole('link', { name: 'Explore the Hall of Fame' }).click();
    await expect(page).toHaveURL(/\/hall-of-fame$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/African.*Impact.*Hall of.*Fame/);

    if (width < 1024) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.locator('#site-mobile-navigation').getByRole('button', { name: 'ASIP', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
    } else await page.getByRole('button', { name: 'ASIP', exact: true }).click();
    await expect(page).toHaveURL(/\/african-student-impact-program$/);
    await page.locator('footer').getByRole('link', { name: 'Programmes', exact: true }).click();
    await expect(page).toHaveURL(/\/#fellowship$/);
    await page.locator('#fellowship').getByRole('link', { name: 'View ASIP program' }).click();
    await expect(page).toHaveURL(/\/african-student-impact-program$/);
    await page.goto('/#final-cta');
    await page.locator('#final-cta').getByRole('link', { name: 'Explore ASIP', exact: true }).click();
    await expect(page).toHaveURL(/\/african-student-impact-program$/);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Applications are now closed');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    expect(errors).toEqual([]);
  });
}

test('native impact dialog traps focus, supports Escape/backdrop and respects dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  const home = page.getByRole('link', { name: 'Doubleyou Home', exact: true });
  await home.focus();
  const intro = page.getByRole('dialog', { name: /Be part of the story/ });
  await expect(intro).toBeVisible();
  await expect(intro.getByRole('button', { name: 'Close impact introduction' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(intro.getByRole('link', { name: 'Support our work' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(intro.getByRole('button', { name: 'Close impact introduction' })).toBeFocused();
  for (let index = 0; index < 5; index++) {
    await page.keyboard.press('Tab');
    expect(await intro.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(intro).not.toBeVisible();
  await expect(home).toBeFocused();
  await page.reload();
  await expect(intro).not.toBeVisible();
  await page.waitForTimeout(1400);
  await expect(intro).not.toBeVisible();
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await expect(intro).toBeVisible();
  await page.mouse.click(1, 1);
  await expect(intro).not.toBeVisible();
});

test('popup Hall and support actions navigate and do not reopen on return', async ({ page }) => {
  for (const [name, path] of [['Explore the Hall of Fame', '/hall-of-fame'], ['Support our work', '/#give']]) {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    const intro = page.getByRole('dialog', { name: /Be part of the story/ });
    await expect(intro).toBeVisible();
    await intro.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(path.replace('/', '\\/') + '$'));
    await expect(intro).not.toBeVisible();
    if (path.endsWith('#give')) await expect(page.getByRole('heading', { name: 'Join Us in Building the Future' })).toBeVisible();
  }
});
