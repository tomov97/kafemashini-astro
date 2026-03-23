import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:4322/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
console.log("Total page height:", totalHeight);

const step = 1080;
let i = 0;
for (let y = 0; y < totalHeight; y += step) {
  await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `ss-part${i}.png`
  });
  console.log(`ss-part${i} at y=${y}`);
  i++;
}

await browser.close();
