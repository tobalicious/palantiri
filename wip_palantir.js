const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://wip.chat/@getaclue'; // three products


async function getProductURLs(url) {
  const productURLs = [];

  const html = await rp(url + '/products');
  $('.productCard__logo', html).each(function(i, elem) {
    productURLs.push($(this).attr('href'));
  });


  return productURLs;
}

async function getProductInfo(productURL) {
  let html = await rp(productURL);

  let productImageSrc = $('.contentBlock__cover', html).attr('src');
  let productName = $('.contentBlock__title', html).text();
  let productTagline = $('.contentBlock__description > p', html).text();

  let productInfo = {
    productImageSrc: productImageSrc,
    productName: productName,
    productTagline: productTagline,
  }

  return productInfo;
}

rp(url)
  .then(async function(html){

    const profileImageSrc = $('.contentBlock__cover', html).attr('src'); // get profile image

    const products = [];
    const productURLs = await getProductURLs(url);

    for (let i=0; i<productURLs.length; i++) {
      let productInfo = await getProductInfo(productURLs[i]);
      products.push(productInfo);
    }

    const profileInfo = {
      profileImageSrc: profileImageSrc,
      products: products
    };

    console.log(profileInfo);
  })
  .catch(function(err){
    console.log(err);
  });
