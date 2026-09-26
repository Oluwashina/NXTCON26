import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const OUT = '.preview';
const BASE = process.env.BASE ?? 'http://localhost:5173';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(name, viewport) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport, deviceScaleFactor: viewport.deviceScaleFactor ?? 1 });
  const shot = async (label, full = false) =>
    page.screenshot({ path: `${OUT}/${name}-${label}.png`, fullPage: full });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(5200);
  await shot('1-intro');

  await page.getByRole('button', { name: /discover your piece/i }).click();
  await wait(2200);
  await page.getByRole('button', { name: /knight — see how it moves/i }).first().click();
  await wait(1200);
  await shot('2-board', true);

  await page.getByRole('button', { name: /begin the experience/i }).click();
  await wait(1800);
  await shot('3-quiz');

  for (let i = 0; i < 7; i += 1) {
    const letter = i % 2 === 0 ? 'A' : 'B';
    await page.keyboard.press(letter);
    await wait(900);
  }

  await wait(900);
  await shot('4-calculating');
  await wait(4200);
  await shot('5-reveal', true);

  await page.getByRole('button', { name: /every piece has a purpose/i }).click();
  await wait(2600);
  await page.getByLabel(/what move have you been postponing/i).fill('Finally starting the thing I keep planning.');
  await wait(700);
  await shot('6-reflection', true);

  await page.getByRole('button', { name: /my next move/i }).click();
  await wait(3000);
  await shot('7-event', true);

  await page.getByRole('button', { name: /get event details/i }).click();
  await wait(1000);
  await shot('8-details', true);

  // Deep link
  await page.goto(`${BASE}/?piece=bishop`, { waitUntil: 'networkidle' });
  await wait(3200);
  await shot('9-deeplink', true);

  await browser.close();
}

await mkdir(OUT, { recursive: true });
for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  await run(name, viewport);
  console.log(`done: ${name}`);
}
