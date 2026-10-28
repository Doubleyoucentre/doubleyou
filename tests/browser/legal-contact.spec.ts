import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { legalPolicies } from '../../src/lib/legal-policies';

const pages = [...legalPolicies, { path: '/contact', title: 'Contact Us' }];
const footerLinks = [
  ['About Us', '/#about-us'], ['Programmes', '/#fellowship'], ['Partnerships', '/#partners'],
  ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'],
  ['Terms & Conditions', '/terms-and-conditions'], ['Refund Policy', '/refund-policy'],
];
const retainedFooterLinks = [
  ['Our Ecosystem', '/#core-solutions'], ['ASIP', '/african-student-impact-program'],
  ['Blood Drive', '/#blood-drive'], ['Give', '/#give'], ['African Impact Hall of Fame', '/hall-of-fame'],
  ['Facebook', 'https://www.facebook.com/Doubleyouinitiative'],
  ['Instagram', 'https://www.instagram.com/doubleyoucenter?obrf=a3N4MHZhYXBnMWZn'],
  ['X (Twitter)', 'https://twitter.com/DoubleyouNGA'],
  ['LinkedIn', 'https://www.linkedin.com/company/doubleyougroup/'],
  ['hello@doubleyou.com.ng', 'mailto:hello@doubleyou.com.ng'],
];

test.beforeEach(async ({ context, baseURL }) => {
  // Live acceptance uses the real network; local checks isolate external dependencies.
  if (baseURL?.startsWith('http://127.0.0.1')) {
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === baseURL) return route.continue();
      if (url.hostname === 'fonts.googleapis.com') return route.fulfill({ contentType: 'text/css', body: '' });
      return route.abort();
    });
  }
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`public policies, approved text, contact links and footer at ${width}px`, async ({ context, baseURL }) => {
    const errors: string[] = [];
    for (const item of pages) {
      // A fresh unauthenticated tab for every direct URL, then an actual refresh.
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.url().startsWith(baseURL!) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(item.path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.title, { timeout: 15000 });
      await expect(page).toHaveTitle(`${item.title} | Doubleyou Centre`);
      await expect(page.locator('meta[name="description"][data-react-helmet]')).toHaveAttribute('content', /Doubleyou Centre/);
      await expect(page.locator('link[rel="canonical"][data-react-helmet]')).toHaveAttribute('href', `https://www.doubleyou.com.ng${item.path}`);
      await expect(page.locator('main')).toContainText('Advancing Human Potential Across Africa');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      if ('sections' in item) {
        await expect(page.locator('time')).toHaveText('21 October 2026');
        await expect(page.locator('time')).toHaveAttribute('datetime', '2026-10-21');
        const sections = page.locator('.policy-sections section');
        await expect(sections).toHaveCount(10);
        for (const [index, [title, body]] of item.sections.entries()) {
          await expect(sections.nth(index).locator('h2')).toHaveText(`${index + 1}. ${title}`);
          expect(await sections.nth(index).locator('p').textContent()).toBe(body);
        }
        await sections.last().scrollIntoViewIfNeeded();
        await expect(sections.last()).toBeInViewport();
        if (item.path === '/terms-and-conditions') {
          const refund = sections.nth(3).getByRole('link', { name: 'Refund Policy', exact: true });
          await expect(refund).toHaveAttribute('href', '/refund-policy');
          await refund.click();
          await expect(page.getByRole('heading', { level: 1 })).toHaveText('Refund Policy');
          await page.goBack();
        }
      } else {
        await expect(page.locator('main h2')).toHaveText(['General Enquiries', 'Website', 'Programmes & Applications', 'Partnerships & Collaborations', 'Media & Communications', 'Social Media']);
        await expect(page.locator('.contact-card p')).toHaveText([
          'Email: hello@doubleyou.com.ng', 'Phone: +234 807 370 5508', 'www.doubleyou.com.ng',
          'For enquiries about programmes, applications, events and opportunities, contact hello@doubleyou.com.ng.',
          'For institutional partnerships, sponsorships and strategic collaborations, contact hello@doubleyou.com.ng.',
          'For media enquiries, interviews and official communications, contact hello@doubleyou.com.ng.', '@doubleyoucenter',
        ]);
        await expect(page.locator('#contact-social + p a')).toHaveCount(0);
      }
      for (const anchor of await page.locator('main a').all()) {
        const text = await anchor.textContent();
        if (text === 'hello@doubleyou.com.ng') await expect(anchor).toHaveAttribute('href', 'mailto:hello@doubleyou.com.ng');
        if (text === '+234 807 370 5508') await expect(anchor).toHaveAttribute('href', 'tel:+2348073705508');
        if (text === 'www.doubleyou.com.ng') await expect(anchor).toHaveAttribute('href', 'https://www.doubleyou.com.ng');
      }
      await expect(page.locator('main a[href="mailto:hello@doubleyou.com.ng"]').first()).toBeAttached();
      await expect(page.locator('main a[href="tel:+2348073705508"]')).toHaveCount(1);
      for (const [name, href] of [...footerLinks, ...retainedFooterLinks]) {
        const anchor = page.locator('footer').getByRole('link', { name, exact: true });
        await expect(anchor).toHaveCount(1);
        await expect(anchor).toHaveAttribute('href', href);
      }
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect(page.locator('footer')).toContainText('© 2026 Doubleyou Centre. All rights reserved.');
      await expect(page.locator('footer')).toContainText('Est. 2019');
      await expect(page.locator('footer')).toContainText('Advancing Human Potential Across Africa — through education, innovation, and community impact.');
      await expect(page.locator('footer')).toContainText('Committed to Sustainable Development Goals');
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
      expect(await page.locator('main').evaluate(element => [...element.querySelectorAll('h1,h2,p')].every(node => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        return rect.width > 0 && rect.left >= 0 && rect.right <= innerWidth && style.visibility !== 'hidden' && style.display !== 'none' && (style.overflowY === 'visible' || node.scrollHeight <= node.clientHeight + 1);
      }))).toBe(true);
      if ([390, 768, 1440].includes(width)) {
        await mkdir('.local-audit/legal-contact', { recursive: true });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `.local-audit/legal-contact/${baseURL?.startsWith('https:') ? 'live' : 'preview'}${item.path}-${width}.png`, fullPage: true });
      }
      await page.reload();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.title);
      await page.close();
    }
    expect(errors).toEqual([]);
  });
}

test('shared footer destinations work from main pages and preserve homepage anchors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['/', '/african-student-impact-program', '/global-internships', '/quest-quiz', '/hall-of-fame']) {
    await page.goto(route);
    await expect(page.locator('footer')).toBeAttached({ timeout: 15000 });
    const intro = page.getByRole('dialog');
    if (route === '/') {
      await expect(intro).toBeVisible();
      await intro.getByRole('button', { name: 'Close impact introduction' }).click();
    }
    for (const [name, href] of footerLinks.slice(3)) {
      await page.locator('footer').getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(pages.find(item => item.path === href)!.title);
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
      await page.goBack();
    }
  }
  for (const [name, href] of footerLinks.slice(0, 3)) {
    await page.goto('/contact');
    await page.locator('footer').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect.poll(() => page.locator(href.slice(1)).evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(150);
  }
  expect(errors).toEqual([]);
});
