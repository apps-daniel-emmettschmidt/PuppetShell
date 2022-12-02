// /routes/posts.js
const express = require('express')
const reader = express.Router()

const puppeteer = require('puppeteer');

async function startBrowser(address, setUserAgent, waitFor){
	let result = await setGetPage(address, setUserAgent, waitFor);

  console.log(result);
	
	return result;
}

async function setGetPage(address, userAgent, waitFor)
{
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        'ignoreHTTPSErrors': true
    });

    const page = await browser.newPage();

    if(waitFor === undefined)
    {
      page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');
    }
    else
    {
      page.setUserAgent(userAgent);
    }

    page.setDefaultNavigationTimeout(240000);

    await page.goto(address);

    if((waitFor === undefined) == false)
    {
      await page.waitForSelector(waitFor);
    }

    const html = await page.content();

    return html;
    
  } catch (err) {
      console.log("Could not create a browser instance => : ", err);
  }

}

reader.get('/', (req, res, next) => {

  const address = req.query.address;

  const userAgent = req.query.userAgent;

  const waitFor = req.query.waitFor;

  let response;
  
  startBrowser(address, userAgent, waitFor).then((h) => 
    res.send(
      body = [html = h]
    )
  );
})

module.exports = reader