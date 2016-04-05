const sentry = require('../controllers/sentry');
const home = require('../controllers');

function routes(app) {
  app.get('/events', sentry);
  app.get('/', home);
};

module.exports = routes;
