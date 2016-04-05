const sentryHeaders = require('./headers');
const sentryBody = require('./body');

module.exports = {
  headers: {
    get: sentryHeaders,
  },
  body: {
    get: sentryBody,
  }
};
