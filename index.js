const fs = require('fs');
const Crawler = require('js-crawler');

const args = process.argv.slice(2);
const fileEnding = args[0];
const websiteURL = args[1];
const outputFileNameArg = args[2];
const outputFileName = outputFileNameArg || fileEnding;

new Crawler().configure({ depth: 3 })
  .crawl(websiteURL, (page) => {
    console.info(page.url);
  }, null, (crawledUrls) => {
    const allLinks = crawledUrls.filter((url) => url.endsWith(`.${fileEnding}`));
    const json = JSON.stringify(allLinks);

    fs.writeFile(`./results/${outputFileName}.json`, json, 'utf8', () => {
      console.info(`============= result for ${websiteURL} ============`);
      console.info(`${allLinks.length} ${fileEnding} links found`);
      console.info('');
      console.info(`all ${fileEnding} links written to results/${outputFileName}.json`);
      console.info('===================================================');
    });
  });
