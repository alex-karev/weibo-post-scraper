// Init modules
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const {weiboScraper} = require("./weibo-scraper.js");

// Parameters
let keywords = [];
let maxPages = 5;
let skipLogin = false;
let outputDir = "output";
let loginTimeout = 30000;

// Help
if (argv.h !== undefined || argv.help !== undefined) {
  console.log(
    "Collects contents of weibo posts based on a list of keywords",
    "\n\nUSAGE: npm start -- [ARGUMENTS] -k [KEYWORDS]",
    "\n\nARGUMENTS:",
    "\n  -k  --keywords    Keywords for search (e.g. word1,word2,word3)",
    "\n  -p  --pages       Maximum number of pages (default: 5)",
    "\n  -s  --skiplogin   Skip login procedure, use saved cookies",
    "\n  -t  --timeout     Login timeout in milliseconds (default: 30000)",
    "\n  -o  --output      Output directory (default: output)",
    "\n  -h  --help        Print this message",
    "\n"
  );
  process.exit();
}

// Parse arguments
maxPages = (argv.p !== undefined) ? Number(argv.p) : maxPages;
maxPages = (argv.pages !== undefined) ? Number (argv.pages) : maxPages;
skipLogin = (argv.s !== undefined) ? true : skipLogin;
skipLogin = (argv.skiplogin !== undefined) ? true : skipLogin;
outputDir = (argv.output !== undefined && typeof argv.output === "string") ? argv.output : outputDir;
outputDir = (argv.o !== undefined && typeof argv.o === "string") ? argv.o : outputDir;
loginTimeout = (argv.t !== undefined) ? Number(argv.t) : loginTimeout;
loginTimeout = (argv.timeout !== undefined) ? Number (argv.timeout) : loginTimeout;

// Get keywords
let keywordString = ""
keywordString = (argv.k !== undefined && typeof argv.k === "string") ? argv.k : keywordString;
keywordString = (argv.keywords !== undefined && typeof argv.keywords === "string") ? argv.keywords : keywordString;

// Parse keywords
if (keywordString.length === 0) {
  console.log("Error! No keywords specified","\nUse -h/--help for help.");
  process.exit();
}
keywords = keywordString.split(",");

// Create output directory if it does not exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Start scraping
weiboScraper({keywords, maxPages, skipLogin, loginTimeout, outputDir});
