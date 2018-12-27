const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
  async getProfileInfo(username) {
    url = 'https://www.indiehackers.com/' + username;

    let html = await rp(url);

    const profileImageSrc = $('.user-avatar__img', html).attr('src');

    let productURLs = [];
    $('.user-products__product', html).each(function() {
      productURLs.push(`https://www.indiehackers.com${$(this).attr('href')}`);
    });

    const products = [];
    if (productURLs.length > 0) {
      for (let i=0; i < productURLs.length; i++) {

        // load product page url
        let productHTML = await rp(productURLs[i]);
        // scrape info
        let productImageSrc = $('.product-avatar__img', productHTML).attr('src');
        let productName = $('.product-header__title', productHTML).text().trim();
        let productTagline = $('.product-header__tagline', productHTML).text().trim();
        let productDescription = $('.product-sidebar__description', productHTML).text().trim();

        // build object
        let productInfo = {
          productImageSrc: productImageSrc,
          productName: productName,
          productTagline: productTagline,
          productDescription: productDescription,
        };
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
