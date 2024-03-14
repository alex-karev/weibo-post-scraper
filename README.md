# Weibo puppeteer parser

Quick node js script utilizing puppeteer for parsing posts from weibo.

## Installation

```bash
git clone https://github.com/alex-karev/weibo-post-scraper
cd weibo-post-scraper
npm install
```

## Usage

Set queries and number of pages to parse in `index.js`. Then run:

```bash
npm run start
```

Login yo your account. Scraping will start automatically. You will find your data in <QUERY>.csv files

## TODO

- [ ] Set parameters via cli arguments instead of constants.
- [ ] Error detection and prevention.
- [ ] Use puppeteer-cluster

## Contribution

Feel free to fork this repo and make pull requests.

If you like my work, support it:

BTC: 32F3zAnQQGwZzsG7R35rPUS269Xz11cZ8B

## License

See `LICENSE`
