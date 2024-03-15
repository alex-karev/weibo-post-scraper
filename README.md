# Weibo puppeteer scraper

Quick node js script utilizing puppeteer for scraping posts from weibo.

## Features

- Cookies are saved **automatically** after you login to your account.
- Cookies can be **reused** across runs using `-s/--skiplogin` flag.
- Puppeteer **stealth** plugin is used.
- **Multiple keywords** and adjustable number of pages.
- Output to **csv**.

## Installation

```bash
git clone https://github.com/alex-karev/weibo-post-scraper
cd weibo-post-scraper
npm install
```

## Usage

```bash
npm start -- [ARGUMENTS] -k [KEYWORDS]
```

Example:

```bash
npm start -- --help
npm start -- -p 20 -t 10000 -k one,two,three
```

Login yo your account. Scraping will start automatically after some timeout. You will find your data in <OUTPUT>/<QUERY>.csv files

## TODO

- [x] Set parameters via cli arguments instead of constants.
- [ ] Error detection and prevention.
- [ ] Use puppeteer-cluster

## Contribution

Feel free to fork this repo and make pull requests.

If you like my work, support it:

BTC: 32F3zAnQQGwZzsG7R35rPUS269Xz11cZ8B

## License

Free to use under GNU GPL 3.0. See [LICENSE](https://github.com/alex-karev/weibo-post-scraper/blob/main/LICENSE) for more information.
