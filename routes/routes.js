const IhController = require('../controllers/ih_controller');
const WipController = require('../controllers/wip_controller');

module.exports = (app) => {
  app.post('/palantiri/v1/ih', IhController.getIndieHackers);

  app.post('/palantiri/v1/wip', WipController.getWIP);


}
