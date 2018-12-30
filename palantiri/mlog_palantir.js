const puppeteer = require('puppeteer');
const $ = require('cheerio');

module.exports = {
  async getProfileInfo(username) {
    // build url
    const url = `https://getmakerlog.com/@${username}`;

    // open puppeteer
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(1000);

    // get html
    const html = await page.content();

    // get profile name, but sort out the metrics
    // this won't work if I feed regex directly into split??
    let regEx = /🔥|😢/;
    const profileName = $('.level-item > .title', html).text().split(regEx)[0]; // for some reason, the other div is pulled in

    // get profile image
    const profileImageSrc = $('.box > center > .Avatar > img', html).attr('src');

    // some of makerlog's social urls consistently load twice?
    const allSocialURLs = [];
    $('.user-box > .social-count > a', html).each(function(i, elem) {
      allSocialURLs.push($(this).attr('href'));
    });

    // sort them by uniqueness.  O(n^2), but small array only so we're good
    const socialURLs = Array.from(new Set(allSocialURLs))

    const productURLs = [];
    $('.sticky-outer-wrapper > .sticky-inner-wrapper > .card > .card-content > div > a', html).each(function(i, elem) {
      productURLs.push(`https://getmakerlog.com${$(this).attr('href')}`);
    });

    // build product info
    const products = [];
    if (productURLs.length > 0) {
      for (let i=0; i<productURLs.length; i++) {
        // open new browser page
        let productPage = await browser.newPage();
        await productPage.goto(productURLs[i]);

        // get html
        let productHTML = await productPage.content();

        // get info
        let productImageSrc = $('article > div > figure > img', productHTML).attr('src');
        let productName = $('.media > .media-content > .title', productHTML).text().split(' 🚀')[0];
        let productTagline = $('.media > .media-content > .subtitle', productHTML).text();

        await productPage.close();

        let productInfo = {
          productName: productName,
          productURL: productURLs[i],
          productImageSrc: productImageSrc,
          productTagline: productTagline
        };

        products.push(productInfo);
      } // end for
    } // end if

    let profileInfo = {
      profileName: profileName,
      profileImageSrc: profileImageSrc,
      socialURLs: socialURLs,
      products: products
    };

    browser.close();

    return profileInfo;
  }
}
