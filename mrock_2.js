const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://maker.rocks/tob';
const url2 = 'https://maker.rocks/ethan';

async function test() {
  const browser = await puppeteer.launch();
  console.log('launched');

  const page = await browser.newPage();
  console.log('new page made');
  await page.goto(url2);
  await page.waitFor(3000);
  console.log('url reached');
  const html = await page.content();

  console.log(`\n\n\n\n${html}\n\n\n\n`);
  /*
  // get links : works
  $('.profile-links > a', html).each(function() {
    console.log($(this).attr('href'));
  });
  */
  // get names : works

  $('.profile-text > .name', html).each(function() {
    console.log($(this).text());
  });

  console.log('\n')

  // sort each product, gather info
  $('.product', html).each(function(i, elem) {
    console.log($('a', elem).attr('href')); // gets link to product
    console.log($('a > .name', elem).text().split('  ')[0]); // otherwise includes span with votes in it
    console.log($('a > .name > .thumbnail', elem).attr('src')); // gets link to product profile image
    console.log($('.tagline', elem).text()); // gets description of product
    console.log('\n')
  });


  $('.profile-image', html).each(function() {
    console.log($(this).attr('src'));
  })
  
  console.log('\n')


  await browser.disconnect();
  console.log('disconnected');
  await browser.close();
  console.log('closed');
}

test();
