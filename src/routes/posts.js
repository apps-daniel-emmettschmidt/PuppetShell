// /routes/posts.js
const express = require('express')
const reader = express.Router()

const puppeteer = require('puppeteer');

async function startBrowser(address, waitFor){
	let result = await setGetPage(address, waitFor);
	
	return result;
}

async function setGetPage(address, waitFor)
{
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        args: ["--no-sandbox"],
        'ignoreHTTPSErrors': true
    });

    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(240000);

    await page.goto(address);

    if((waitFor === undefined) == false)
    {
      await page.waitForSelector(waitFor);
    }

    const html = await page.content();

    console.log(html);
    
  } catch (err) {
      console.log("Could not create a browser instance => : ", err);
  }

}

reader.get('/', (req, res, next) => {

  const address = req.query.address;

  const waitFor = req.query.waitFor;

  startBrowser(address, waitFor);

  res.send('Heard ' + address);
    // 'You have hit GET /posts endpoint')
})

module.exports = reader