# Weibo Post Scraper

Quick node js script utilizing puppeteer for scraping posts from weibo.

## Features

- Cookies are saved **automatically** after you login to your account.
- Cookies can be **reused** across multiple runs using `-s/--skiplogin` flag.
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
npm start -- --skiplogin --pages 5 --keywords four,five,six
```

1. Run script. 
2. Login to your account. 
3. Scraping will start automatically after some time.
4. Data is saved to <OUTPUT>/<QUERY>.csv files.

## TODO

- [x] Set parameters via cli arguments instead of constants.
- [x] Error handling.
- [ ] Replace CSV with a better output format.
- [ ] Use puppeteer-cluster

## Contribution

Feel free to fork this repo and make pull requests.

If you like my work, please, support me:

BTC: 32F3zAnQQGwZzsG7R35rPUS269Xz11cZ8B

## License

Free to use under GNU GPL 3.0. See [LICENSE](https://github.com/alex-karev/weibo-post-scraper/blob/main/LICENSE) for more information.
