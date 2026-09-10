import { chromium } from 'playwright'

const BASE = 'http://localhost:5174'
const browser = await chromium.launch()

const shots = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 375, height: 800, name: 'mobile' },
]

for (const { width, height, name } of shots) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.goto(BASE, { waitUntil: 'load' })
  await page.waitForSelector('.loader', { state: 'detached', timeout: 10000 })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `scripts/shots/${name}-hero.png` })
  await page.evaluate(() => document.getElementById('practice').scrollIntoView())
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `scripts/shots/${name}-practice.png` })
  await page.evaluate(() => document.getElementById('people').scrollIntoView())
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `scripts/shots/${name}-people.png` })
  await page.evaluate(() => document.getElementById('contact').scrollIntoView())
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `scripts/shots/${name}-contact.png` })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `scripts/shots/${name}-footer.png` })
  await page.close()
}

await browser.close()
console.log('screenshots written')
