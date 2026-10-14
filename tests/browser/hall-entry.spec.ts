import {test,expect} from '@playwright/test'
import {mkdir} from 'node:fs/promises'
test.beforeEach(async({context,baseURL})=>{await context.route('**/*',route=>new URL(route.request().url()).origin===baseURL?route.continue():route.abort())})
for(const width of [320,390,768,1280,1440]){
 test(`native main-site Hall entry, mobile navigation and existing giving at ${width}px`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width,height:1000})
  await page.goto('/hall-of-fame');await expect(page.getByRole('heading',{level:1})).toHaveText(/African.*Impact.*Hall of.*Fame/)
  await expect(page.locator('.hall-entry')).not.toContainText(/sample|placeholder|development|fictional|coming soon/i)
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false)
  const primary=page.getByRole('link',{name:'Contribute Now',exact:true});await expect(primary).toHaveAttribute('href','/#give')
  if(width===1440){
   await primary.focus()
   const style=await primary.evaluate(element=>{const s=getComputedStyle(element);return{foreground:s.color,background:s.backgroundColor,outline:s.outlineStyle}})
   const luminance=(rgb:string)=>rgb.match(/[\d.]+/g)!.slice(0,3).map(Number).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0)
   const fg=luminance(style.foreground),bg=luminance(style.background),contrast=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)
   expect(contrast).toBeGreaterThanOrEqual(4.5);expect(style.outline).not.toBe('none')
  }
  if(width<1024){const button=page.locator('button[aria-controls="site-mobile-navigation"]');await button.click();await expect(button).toHaveAttribute('aria-expanded','true');await page.locator('#site-mobile-navigation').getByRole('link',{name:'Hall of Fame',exact:true}).focus();await page.keyboard.press('Escape');await expect(button).toBeFocused();await expect(button).toHaveAttribute('aria-expanded','false')}
  await expect(page.locator('#site-mobile-navigation')).toHaveCount(0)
  if(width===390||width===1440){await mkdir('.local-audit/design-qa',{recursive:true});await page.screenshot({path:`.local-audit/design-qa/main-hall-${width}.png`,fullPage:true})}
  await page.reload();await expect(primary).toBeVisible();await primary.click();await expect(page).toHaveURL(/\/#give$/)
  await expect(page.getByRole('heading',{name:'Help Us Build the Future'})).toBeVisible()
  await expect.poll(()=>page.locator('#give').evaluate(e=>Math.abs(e.getBoundingClientRect().top))).toBeLessThan(150)
  await page.goBack();await expect(page).toHaveURL(/\/hall-of-fame$/);await expect(primary).toBeVisible()
  await page.locator('footer').getByRole('link',{name:'Give',exact:true}).click();await expect(page).toHaveURL(/\/#give$/)
  await expect.poll(()=>page.locator('#give').evaluate(e=>Math.abs(e.getBoundingClientRect().top))).toBeLessThan(150)
  await page.locator('footer').getByRole('link',{name:'African Impact Hall of Fame',exact:true}).click();await expect(page).toHaveURL(/\/hall-of-fame$/)
  expect(errors).toEqual([])
 })
}
