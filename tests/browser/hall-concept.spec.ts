import {test,expect,type Page} from '@playwright/test'
import {mkdir} from 'node:fs/promises'
const endpoint='https://published.example.test/api/hall-of-fame'
const empty={source:'awaiting-verified-data',contributors:[],statistics:[],countries:[],stories:[]}
// Explicit TEST records. Never imported into the application or deployed as production data.
const published={source:'verified',contributors:[{id:'test-builder',name:'TEST Impact Builder',country:'Nigeria',profession:'Engineer',category:'individuals',amountMinor:1000,currency:'USD',photoUrl:'/portraits/test.svg',quote:'TEST published statement',supportLabel:'TEST programme',email:'private@example.test',ownershipToken:'TEST-PRIVATE'}],statistics:[{id:'impact-builders',label:'Impact Builders',value:1}],countries:[{code:'NG',name:'Nigeria',latitude:9.08,longitude:8.68,contributorCount:1}],stories:[{id:'test-story',slug:'test-programme-update',headline:'TEST programme update',summary:'TEST approved summary',category:'Education',date:'2026-10-14',imageUrl:'/media/test.svg',imageAlt:'TEST programme artwork',body:['TEST approved story paragraph.'],highlights:[]}]}
test.beforeEach(async({context,baseURL})=>context.route('**/*',route=>new URL(route.request().url()).origin===baseURL?route.continue():route.request().url()===endpoint?route.fulfill({json:empty}):route.request().url().endsWith('/test.svg')?route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="320" height="240" fill="#e7f4ec"/><text x="20" y="100">TEST image</text></svg>'}):route.abort()))
async function noOverflow(page:Page){expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1)}
for(const width of [320,390,768,1024,1440])test(`illustrated concept and always-visible Africa map at ${width}px without fictional records`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.goto('/hall-of-fame')
  await expect(page.getByRole('heading',{name:'Recognition starts with a contribution'})).toBeVisible()
  await expect(page.locator('.hall-entry__artwork img')).toBeVisible()
  expect(await page.locator('.hall-entry__artwork img').evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true)
  await expect(page.locator('#hall-impact svg[role="img"]')).toBeVisible();await expect(page.getByRole('heading',{name:'Latest impact stories'})).toBeVisible()
  await expect(page.locator('.hall-entry')).not.toContainText(/1,482|28,745|4,320|Tunde|Amina|SAMPLE|placeholder|Coming Soon/i)
  await expect(page.locator('.hall-map-marker')).toHaveCount(0);await expect(page.locator('.hall-statistics dd')).toHaveCount(5)
  await noOverflow(page);await mkdir('.local-audit/concept-qa',{recursive:true});if([390,768,1440].includes(width))await page.screenshot({path:`.local-audit/concept-qa/concept-${width}.png`,fullPage:true})
  const overlap=await page.evaluate(()=>{const title=document.querySelector('#hall-entry-title')!.getBoundingClientRect(),art=document.querySelector('.hall-entry__artwork')!.getBoundingClientRect();return Math.max(0,Math.min(title.right,art.right)-Math.max(title.left,art.left))*Math.max(0,Math.min(title.bottom,art.bottom)-Math.max(title.top,art.top))});expect(overlap).toBe(0)
})
test('approved public cards, filtering, money, country keyboard and story navigation preserve privacy',async({page})=>{
  await page.route(endpoint,route=>route.fulfill({json:published}));await page.goto('/hall-of-fame')
  await expect(page.getByRole('heading',{name:'TEST Impact Builder',exact:true})).toBeVisible();await expect(page.locator('.hall-contributor__amount')).toHaveText('$10.00')
  await expect(page.locator('body')).not.toContainText(/private@example|TEST-PRIVATE/)
  const search=page.getByRole('searchbox');await search.fill('Engineer');await expect(page.locator('.hall-contributor')).toHaveCount(1)
  await page.getByRole('button',{name:'Organizations',exact:true}).click();await expect(page.getByRole('heading',{name:'No matching contributors'})).toBeVisible()
  await page.getByRole('button',{name:'Clear all filters'}).click();await expect(search).toHaveValue('')
  await page.getByRole('button',{name:'Nigeria',exact:true}).focus();await expect(page.locator('#hall-impact')).toContainText('Nigeria: 1 recognised contributors');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Nigeria',exact:true})).toHaveAttribute('aria-pressed','false')
  await expect(page.locator('.hall-map-marker')).toHaveCount(1)
  await page.getByRole('link',{name:'TEST programme update',exact:true}).click();await expect(page).toHaveURL(/\/hall-of-fame\/stories\/test-programme-update$/);await expect(page.getByText('TEST approved story paragraph.',{exact:true})).toBeVisible()
  await page.reload();await expect(page.getByRole('heading',{level:1,name:'TEST programme update'})).toBeVisible()
  await page.getByRole('link',{name:'Back to the Hall of Fame'}).click();await expect(page).toHaveURL(/\/hall-of-fame#hall-stories$/)
  await expect.poll(()=>page.locator('#hall-stories').evaluate(element=>element.getBoundingClientRect().top)).toBeLessThan(180)
})
test('error and malformed response show retry instead of fictional fallback; retry restores approved records',async({page})=>{
  let stage='http';await page.route(endpoint,route=>stage==='ready'?route.fulfill({json:published}):route.fulfill({status:stage==='http'?503:200,contentType:'application/json',body:stage==='http'?'{}':'{"source":"unverified"}'}))
  await page.goto('/hall-of-fame');await expect(page.getByRole('alert')).toContainText('could not be loaded');await expect(page.locator('.hall-contributor')).toHaveCount(0)
  stage='malformed';await page.getByRole('button',{name:'Try again',exact:true}).click();await expect(page.getByRole('alert')).toContainText('could not be loaded')
  stage='ready';await page.getByRole('button',{name:'Try again',exact:true}).click();await expect(page.getByRole('heading',{name:'TEST Impact Builder',exact:true})).toBeVisible()
})
test('pending data is announced; missing published story has an honest return path',async({page})=>{
  let release=()=>{};const gate=new Promise<void>(resolve=>{release=resolve});await page.route(endpoint,async route=>{await gate;await route.fulfill({json:empty})})
  await page.goto('/hall-of-fame');await expect(page.getByRole('status')).toContainText('Loading published impact');release();await expect(page.getByRole('heading',{name:'Recognition starts with a contribution'})).toBeVisible()
  await page.goto('/hall-of-fame/stories/unpublished');await expect(page.getByRole('heading',{name:'Story unavailable'})).toBeVisible();await expect(page.getByRole('link',{name:'Back to the Hall of Fame'})).toBeVisible()
})
