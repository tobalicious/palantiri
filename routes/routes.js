const IhController = require('../controllers/ih_controller');
const WipController = require('../controllers/wip_controller');
const MrockController = require('../controllers/mrock_controller');
const MlogController = require('../controllers/mlog_controller');

module.exports = (app) => {
  app.post('/palantiri/v1/ih', IhController.getIndieHackers);

  app.post('/palantiri/v1/wip', WipController.getWIP);

  app.post('/palantiri/v1/mrock', MrockController.getMrock);

  app.post('/palantiri/v1/mlog', MlogController.getMlog);
}
