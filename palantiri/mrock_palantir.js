const puppeteer = require('puppeteer');
const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
  async getProfileInfo(username) {

    // build url, open browser, load page
    const url = 'https://maker.rocks/' + username;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(3000);

    // get html
    const html = await page.content();

    // get profile picture
    const profileImageSrc = $('.profile-image', html).attr('src');

    // get profile name
    const profileName = $('.profile-text > .name', html).text();

    const products = [];
    // sort each product, gather info
    $('.product', html).each(function(i, elem) {
      let productLink = $('a', elem).attr('href'); // gets link to product
      let productName = $('a > .name', elem).text().split('  ')[0]; // otherwise includes span with votes in it
      let productImageSrc = $('a > .name > .thumbnail', elem).attr('src'); // gets link to product profile image
      let productTagline = $('.tagline', elem).text(); // gets description of product

      let productInfo = {
        productLink: productLink,
        productName: productName,
        productImageSrc: productImageSrc,
        productTagline: productTagline
      };

      products.push(productInfo);
    });

    const profileInfo = {
      profileName: profileName,
      profileImageSrc: profileImageSrc,
      products: products
    };

    browser.close();

    return profileInfo;
  }
}
