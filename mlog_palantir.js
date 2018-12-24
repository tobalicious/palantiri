const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://www.getmakerlog.com/@sergio'; // three products

rp(url)
  .then(function(html){
    console.log(html);
    //console.log($('.social_count', html));

    $('a', html).each(function() {
      console.log($(this));
    });


  })
  .catch(function(err){
    console.log(err);
  });
