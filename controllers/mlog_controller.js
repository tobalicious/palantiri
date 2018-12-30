const mlog_palantir = require('../palantiri/mlog_palantir');

module.exports = {
  async getMlog(req, res) {
    const params = req.body;

    if (params.hasOwnProperty('username')) {
      //res.status(202);
      //res.send({ test: 'plz'});
      console.log(params.username);
      const profileInfo = await mlog_palantir.getProfileInfo(params.username);

      res.send({profileInfo: profileInfo});
    } else {
      res.send({ error: 'no username'});
    }
  },
}
