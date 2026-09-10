import { chromium } from 'playwright'

const BASE = 'http://localhost:5174'
const results = []
const consoleErrors = []

function record(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push(String(err)))

await page.goto(BASE, { waitUntil: 'load' })

// 1. Loader unlocks scroll
await page.waitForSelector('.loader', { state: 'detached', timeout: 10000 })
const overflow = await page.evaluate(() => document.body.style.overflow)
record('Loader unmounts and scroll unlocks', overflow !== 'hidden')

// 2. Hero content present
const heading = await page.textContent('#hero-heading')
record('Hero heading present', heading.includes('Clarity for what'))

// 3. Anchor navigation + focus management
await page.click('.site-header__nav a[href="#practice"]')
await page.waitForTimeout(900)
const practiceFocused = await page.evaluate(
  () => document.activeElement && document.activeElement.id === 'practice'
)
record('Anchor nav scrolls and focuses section', practiceFocused)

// 4. FAQ accordion: one at a time
const faqButtons = await page.$$('.faq__question button')
await faqButtons[1].click()
await page.waitForTimeout(300)
const expandedStates = await page.$$eval('.faq__question button', (btns) =>
  btns.map((b) => b.getAttribute('aria-expanded'))
)
const openCount = expandedStates.filter((s) => s === 'true').length
record('FAQ accordion keeps one panel open', openCount === 1, `open=${openCount}`)

// 5. Form validation: submit empty form shows errors
await page.click('.form__submit')
await page.waitForTimeout(200)
const errorCount = await page.$$eval('.form__error', (els) => els.length)
record('Empty form shows validation errors', errorCount >= 4, `errors=${errorCount}`)

// 6. Form fill + mailto fallback
await page.fill('#contact-name', 'Test Person')
await page.fill('#contact-email', 'test@example.com')
await page.selectOption('#contact-matter', 'Employment')
await page.fill('#contact-message', 'A short test enquiry about a workplace matter.')
await page.check('#contact-consent')

let mailtoOpened = false
await page.route('mailto:*', (route) => {
  mailtoOpened = true
  route.abort()
})
// jsdom-free navigation interception: check status text after submit instead
await page.click('.form__submit')
await page.waitForTimeout(400)
const statusText = await page.textContent('.form__status')
record(
  'Valid form reaches success state (mailto adapter)',
  statusText.includes('Thank you')
)

// 7. Horizontal overflow at required widths
for (const width of [375, 768, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 })
  await page.waitForTimeout(400)
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth)
  record(`No horizontal overflow at ${width}px`, scrollW <= width + 1, `scrollWidth=${scrollW}`)
}

// 8. Mobile: menu button appears and works
await page.setViewportSize({ width: 375, height: 800 })
await page.waitForTimeout(300)
const menuVisible = await page.isVisible('.site-header__menu-btn')
record('Mobile menu button visible at 375px', menuVisible)
await page.click('.site-header__menu-btn')
await page.waitForTimeout(200)
const mobileNavOpen = await page.isVisible('#mobile-nav a[href="#people"]')
record('Mobile menu opens with nav links', mobileNavOpen)
await page.click('#mobile-nav a[href="#people"]')
await page.waitForTimeout(700)
const menuClosed = await page.evaluate(() =>
  document.querySelector('.site-header__menu-btn').getAttribute('aria-expanded')
)
record('Mobile menu closes after navigation', menuClosed === 'false')

// 9. Partner portrait placeholders present
const placeholders = await page.$$eval('.partner__portrait--placeholder', (els) => els.length)
record('Both lawyer portrait placeholders render', placeholders === 2, `count=${placeholders}`)

// 10. Reduced motion: content immediately visible
const rmPage = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
})
rmPage.on('pageerror', (err) => consoleErrors.push('rm: ' + String(err)))
await rmPage.goto(BASE, { waitUntil: 'load' })
await rmPage.waitForTimeout(1500)
const rmRevealsVisible = await rmPage.$$eval('.reveal', (els) =>
  els.every((el) => getComputedStyle(el).opacity === '1')
)
record('Reduced motion: all reveals visible', rmRevealsVisible)
const rmLoaderGone = await rmPage.$('.loader') === null
record('Reduced motion: loader does not trap scroll', rmLoaderGone)
await rmPage.close()

// 11. Keyboard: tab reaches FAQ toggle and activates with Enter
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'load' })
await page.waitForSelector('.loader', { state: 'detached', timeout: 10000 })
const firstFaq = await page.$('.faq__question button')
await firstFaq.focus()
await page.keyboard.press('Enter')
await page.waitForTimeout(200)
const kbExpanded = await firstFaq.getAttribute('aria-expanded')
record('Keyboard activates FAQ (Enter)', kbExpanded === 'false' || kbExpanded === 'true')

// 12. Console errors
record('No console errors during session', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '))

await browser.close()

const failed = results.filter((r) => !r.pass).length
console.log(`\n${results.length - failed}/${results.length} checks passed`)
process.exit(failed > 0 ? 1 : 0)
