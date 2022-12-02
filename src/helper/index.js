
const puppeteer = require('puppeteer');
exports.generateDownloadableCertificateLink = async () => {
      // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const certificateUrl = 'https://facebook.com'; 

  // Open URL in current page
  await page.goto(certificateUrl, { waitUntil: 'networkidle0' }); 

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

// Downlaod the PDF
  const pdf = await page.pdf({
    path: 'blotblog.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();

  return certificateUrl
}