// Dependencies
const rp = require('request-promise');
const $ = require('cheerio');

const ih_palantir = require('../palantiri/ih_palantir');

module.exports = {
  async getIndieHackers(req, res, next) {
    const params = req.body;

    if (params.hasOwnProperty('username')) {
      //res.status(202);
      //res.send({ test: 'plz'});
      const profileInfo = await ih_palantir.getProfileInfo(params.username);

      res.send({profileInfo: profileInfo});
    } else {
      res.send({ error: 'no username'});
    }
  },
}
