// Init modules
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require('node:fs/promises');
const {join} = require("node:path");

// Helper functions
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Get all items from current page
async function loadItems(page) {
  // Get content
  const items = await page.evaluate(() => {
    var newItems = [];
    const cards = document.querySelectorAll("div[action-type='feed_list_item']");
    // Loop through each card
    cards.forEach(card => {
      var text = "";
      // Define content and ful content
      const content = card.querySelector("p[node-type='feed_list_content']");
      const contentFull = card.querySelector("p[node-type='feed_list_content_full']");
      // Add data depending on content type
      if (contentFull !== null) {
        text = contentFull.innerText;
      } else if (content !== null) {
        text = content.innerText;
      }
      // Clear output
      text = text
        .trim()
        .replace(/\n|\r/g, "")
      if (text.length > 0) {
        newItems.push(text);
      }
    })
    return newItems
  });
  // Log items
  console.log("Got " + items.length.toString() + " items.");
  return items
}

// Main function
async function weiboScraper({keywords, maxPages, skipLogin, loginTimeout, outputDir}) {
  // Open browse
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1024 });
  let cookies = null;
  const cookiesPath = join(outputDir, "cookies.txt");
  if (!skipLogin) {
    // Login
    await page.goto("https://passport.weibo.com/sso/signin");
    console.log("Waiting for login...");
    // Wait for user to login
    await sleep(loginTimeout);
    // Save cookies
    const newCookies = await page.cookies();
    cookies = newCookies;
    fs.writeFile(cookiesPath, JSON.stringify(newCookies), err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Cookies are saved!");
      }
    });
  } else {
    // Load cookies
    const newCookies = await fs.readFile(cookiesPath, 'utf8');
    cookies = JSON.weiboScraper(newCookies);
  }
  // Set Cookies
  await page.setCookie(...cookies);
  for (var i = 0; i < keywords.length; i++) {
    // Search for query
    const query = keywords[i];
    const outputPath = join(outputDir, query+".csv");
    var items = [];
    // Search for query
    await page.goto("https://s.weibo.com/weibo?q=" + query);
    // Loop through pages
    for (var j = 0; j < maxPages; j++) {
      console.log("Loading page: " + (j + 1).toString());
      const pageItems = await loadItems(page, query);
      items.push(...pageItems);
      if (j >= maxPages - 1) {
        break
      }
      const nextButton = ".next";
      await page.waitForSelector(nextButton);
      await page.click(nextButton);
      await sleep(1000);
    }
    // Serialize data
    var output = "";
    for (var j = 0; j < items.length; j++) {
      output += items[j] + "\n";
    }
    // Save items
    fs.writeFile(outputPath, output, err => {
      if (err) {
        console.error(err);
      }
    });
    console.log("Items are saved to " + outputPath);
  }
  // Close browser
  await browser.close();
}

module.exports.weiboScraper = weiboScraper;