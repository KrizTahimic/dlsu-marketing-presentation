import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.argv[2] || 'pdf'; // 'pdf', 'screenshot', or 'both'

async function run() {
  console.log(`Mode: ${mode}`);
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // Set viewport for 16:9 slides (1920x1080)
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2 // Higher quality
  });

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'slides.html');
  console.log(`Loading ${htmlPath}...`);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  if (mode === 'screenshot' || mode === 'both') {
    // Take full page screenshot showing all slides
    const screenshotFull = path.join(__dirname, 'slides_full.png');
    await page.screenshot({
      path: screenshotFull,
      fullPage: true
    });
    console.log(`Full screenshot saved: ${screenshotFull}`);

    // Take individual slide screenshots
    const slides = await page.$$('.slide');
    for (let i = 0; i < slides.length; i++) {
      const slideNum = i + 1;
      const screenshotPath = path.join(__dirname, `slide_${String(slideNum).padStart(2, '0')}.png`);

      const boundingBox = await slides[i].boundingBox();
      if (boundingBox) {
        await page.screenshot({
          path: screenshotPath,
          clip: {
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width,
            height: boundingBox.height
          }
        });
        console.log(`Slide ${slideNum} saved: ${screenshotPath}`);
      }
    }
  }

  if (mode === 'pdf' || mode === 'both') {
    // Generate PDF (16:9 landscape)
    const pdfPath = path.join(__dirname, 'slides.pdf');
    console.log(`Generating PDF at ${pdfPath}...`);

    await page.pdf({
      path: pdfPath,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log('PDF generated successfully!');
  }

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
