const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://maker.rocks/tob';

rp(url)
  .then(function(html){
    //console.log(html);

    /*
    $('.profile-links > a', html).each(function() {
      console.log($(this).attr('href'));
    });
    */

    console.log($('.profile-image', html));


  })
  .catch(function(err){
    console.log(err);
  });
