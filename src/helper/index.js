
require('../config')
const puppeteer = require('puppeteer');

exports.generateDownloadableCertificateLink = async (certificateId) => {

  // Create a browser instance
  const browser = await puppeteer.launch({ args: [ '--ignore-certificate-errors' ]});

  // Create a new page
  const page = await browser.newPage();
  
  // Website URL to export as pdf
  const certificateUrl = new URL(`http://localhost:3000/certificate?certificateId=${certificateId}`); 

  // Open URL in current page
  await page.goto(certificateUrl.href, { waitUntil: 'networkidle0' }); 

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  console.log(AppConfig.BaseDirectory)
// Downlaod the PDF
  const pdf = await page.pdf({
    path: `${AppConfig.BaseDirectory}/uploads/certificates/pdf/${certificateId}.pdf`,
    margin: { top: '50px', right: '20px', bottom: '50px', left: '20px' },
    printBackground: true,
    format: 'A4',
    landscape: true,
  });

  // Close the browser instance
  await browser.close();

  return certificateUrl.href
}