const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://marvlus.vercel.app/', { waitUntil: 'networkidle2' });
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('marvlus_dom.html', html);
  await browser.close();
})();
