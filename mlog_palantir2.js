const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.getmakerlog.com/@sergio';

puppeteer
  .launch({ headless: true })
  .then(function(browser) {
    console.log('launched');
    return browser.newPage();
  })
  .then(function(page) {
    console.log('loading')
    return page.goto(url)
    .then(function() {
      console.log('waiting')
      return page.waitFor(200);
    })

    .then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    console.log('scraping');

    //onsole.log(typeof html);
    //const a = html.split("<body>").pop();
    //console.log(a);

    console.log($('.social_count', html));
    $('a', html).each(function(i, elem) {
      console.log($(this).attr('href'));
      /*if (($(this).attr('name')==='a')) {
        console.log($(this));
      }*/
    });
    /*$('.social_count', html).each(function() {
      console.log($(this));
    });*/
  })
  .catch(function(err) {
    //handle error
  });
