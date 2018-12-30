const wip_palantir = require('../palantiri/wip_palantir');

module.exports = {
  async getWIP(req, res, next) {
    const params = req.body;

    if (params.hasOwnProperty('username')) {
      //res.status(202);
      //res.send({ test: 'plz'});
      console.log(params.username);
      const profileInfo = await wip_palantir.getProfileInfo(params.username);

      res.send({profileInfo: profileInfo});
    } else {
      res.send({ error: 'no username'});
    }
  },
}
