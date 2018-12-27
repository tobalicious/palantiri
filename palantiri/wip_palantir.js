const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
  async getProfileInfo(username) {
    const url = 'https://wip.chat/@' + username;
    const html = await rp(url);

    const profileImageSrc = $('.contentBlock__cover', html).attr('src'); // get profile image
    const productURLs = [];

    const productsHTML = await rp(url + '/products');
    $('.productCard__logo', productsHTML).each(function(i, elem) {
      productURLs.push($(this).attr('href'));
    });

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
          productImageSrc: productImageSrc,
          productName: productName,
          productTagline: productTagline,
        }
        products.push(productInfo);
      } // end for
      // compile info
      const profileInfo = {
        profileImageSrc: profileImageSrc,
        products: products
      };

      return profileInfo;

    } else {
      const profileInfo = {
        profileImageSrc: profileImageSrc,
      };
      return profileInfo;
    }
  }
};
