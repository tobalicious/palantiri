const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.indiehackers.com/csallen'; // two products
//const url = 'https://www.indiehackers.com/zevi'; // no products

/*
  right now we're getting
  1) profile picture
  2) username (from the user when inputting - won't have in this mvp)
  3) product arrays
    - product image
    - product name
    - product tagline
    - product description
*/

function getProductURLs(html) {
  let productURLs = [];
  $('.user-products__product', html).each(function() {
    productURLs.push(`https://www.indiehackers.com${$(this).attr('href')}`);
  });

  return productURLs;
}

rp(url)
  .then(async function(html){

    // Get user profile image
    const profileImageSrc = $('.user-avatar__img', html).attr('src');

    // Search for products
    const productURLs = getProductURLs(html);
    const numProducts = productURLs.length;

    // If we have products, build out an array of objects representing them
    // product :
    //  {
    //    productImageSrc: project profile image
    //    productName: string
    //    productTagline: string
    //    productDescription: string
    //  }
    const products = [];
    if (numProducts > 0) {
      //const products = [];

      for (let i=0; i < numProducts; i++) {
        let productHTML = await rp(productURLs[i]);

        let productImageSrc = $('.product-avatar__img', productHTML).attr('src');
        let productName = $('.product-header__title', productHTML).text().trim();
        let productTagline = $('.product-header__tagline', productHTML).text().trim();
        let productDescription = $('.product-sidebar__description', productHTML).text().trim();

        let productInfo = {
          productImageSrc: productImageSrc,
          productName: productName,
          productTagline: productTagline,
          productDescription: productDescription,
        };

        products.push(productInfo);
      }
    }

    const profileInfo = {
      profileImageSrc: profileImageSrc,
      products: products
    };

    console.log(profileInfo)
  })
  .catch(function(err){
    console.log(err);
  });
