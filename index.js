// Init modules
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const {weiboScraper} = require("./weibo-scraper.js");

// Parameters
let keywords = [];
let maxPages = 5;
let skipLogin = false;
let outputDir = "output";
let inputPath = "input";
let loginTimeout = 30000;
let headless = false;

// Help
if (argv.h !== undefined || argv.help !== undefined) {
  console.log(
    "Collects contents of weibo posts based on a list of keywords",
    "\n\nUSAGE: npm start -- [ARGUMENTS] -k [KEYWORDS]",
    "\n\n       npm start -- [ARGUMENTS] -i [INPUT_FILE]",
    "\n\nARGUMENTS:",
    "\n  -k  --keywords    Keywords for search (e.g. word1,word2,word3)",
    "\n  -i  --input       Input file where every line is a keyword",
    "\n  -p  --pages       Maximum number of pages (default: 5)",
    "\n  -s  --skiplogin   Skip login procedure, use saved cookies",
    "\n  -t  --timeout     Login timeout in milliseconds (default: 30000)",
    "\n  -o  --output      Output directory (default: output)",
    "\n  -d  --headless    Run puppeteer in headless mode",
    "\n  -h  --help        Print this message",
    "\n"
  );
  process.exit();
}

// Parse arguments
maxPages = (argv.p !== undefined) ? Number(argv.p) : maxPages;
maxPages = (argv.pages !== undefined) ? Number (argv.pages) : maxPages;
skipLogin = argv.s !== undefined || argv.skiplogin !== undefined;
outputDir = (argv.output !== undefined && typeof argv.output === "string") ? argv.output : outputDir;
outputDir = (argv.o !== undefined && typeof argv.o === "string") ? argv.o : outputDir;
loginTimeout = (argv.t !== undefined) ? Number(argv.t) : loginTimeout;
loginTimeout = (argv.timeout !== undefined) ? Number (argv.timeout) : loginTimeout;
headless = argv.d !== undefined || argv.headless !== undefined

// Get keywords
let keywordString = ""
keywordString = (argv.k !== undefined && typeof argv.k === "string") ? argv.k : keywordString;
keywordString = (argv.keywords !== undefined && typeof argv.keywords === "string") ? argv.keywords : keywordString;
if (keywordString.length > 0) {
  keywords = keywordString.split(",");
}

// Read keywords from file
inputPath = (argv.i !== undefined) ? argv.i : inputPath;
inputPath = (argv.input !== undefined) ? argv.input : inputPath;
if (inputPath.length > 0 && fs.existsSync(inputPath)) {
    const newKeywords = fs.readFileSync(inputPath, 'utf8').trim().split("\n");
    keywords = keywords.concat(newKeywords);
}

// Stop if no keywords
if (keywords.length === 0) {
  console.log("Error! No keywords specified","\nUse -h/--help for help.");
  process.exit();
}

// Create output directory if it does not exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Start scraping
weiboScraper({keywords, maxPages, skipLogin, loginTimeout, outputDir, headless});
