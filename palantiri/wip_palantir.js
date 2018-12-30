const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
  async getProfileInfo(username) {
    const url = 'https://wip.chat/@' + username;
    const html = await rp(url);

    // get basic info
    const profileName = $('.contentBlock__title', html).text();
    const profileImageSrc = $('.contentBlock__cover', html).attr('src'); // get profile image

    // get telegram url
    const socialURLs = [];
    $('.buttons > a', html).each(function(i, elem) {
      let url = $(this).attr('href');

      if (url.includes('https')) {
        socialURLs.push(url);
      }
    });

    // get links to each product page
    const productURLs = [];
    const productsHTML = await rp(url + '/products');
    $('.productCard__logo', productsHTML).each(function(i, elem) {
      productURLs.push($(this).attr('href'));
    });

    // visit each product page, grab info
    const products = [];
    if (productURLs.length > 0) {
      for (let i=0; i<productURLs.length; i++) {

        // load the current product's html
        let productHTML = await rp(productURLs[i]);

        // scrape info
        let productImageSrc = $('.contentBlock__cover', productHTML).attr('src');
        let productName = $('.contentBlock__title', productHTML).text();
        let productTagline = $('.contentBlock__description > p', productHTML).text();

        // build object
        let productInfo = {
          productName: productName,
          productURL: productURLs[i],
          productImageSrc: productImageSrc,
          productTagline: productTagline,
        }
        products.push(productInfo);
      } // end for

      // compile info
      let profileInfo = {
        profileName: profileName,
        profileImageSrc: profileImageSrc,
        socialURLs: socialURLs,
        products: products
      };

      return profileInfo;

    } else {
      let profileInfo = {
        profileName: profileName,
        profileImageSrc: profileImageSrc,
        socialURLs: socialURLs,
        products: []
      };

      return profileInfo;
    }
  }
};
