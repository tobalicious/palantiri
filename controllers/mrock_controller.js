const mrock_palantir = require('../palantiri/mrock_palantir');

module.exports = {
  async getMrock(req, res) {
    const params = req.body;

    if (params.hasOwnProperty('username')) {
      //res.status(202);
      //res.send({ test: 'plz'});
      console.log(params.username);
      const profileInfo = await mrock_palantir.getProfileInfo(params.username);

      res.send({profileInfo: profileInfo});
    } else {
      res.send({ error: 'no username'});
    }
  },
}
