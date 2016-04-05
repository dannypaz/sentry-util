const _ = require('lodash');
const SENTRY_API_HELPER = require('../helpers/sentry');

const SENTRY_API_URL = process.env.SENTRY_API_URL || 'URL NOT FOUND';
const CSRF_EVENT_URL = SENTRY_API_URL + 'YOUR_EVENT_URL';

// Functions that will normalize data from the
// curl request to sentry
function _onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
};

function _removeQuotes(str) {
  return str.replace("'", "").replace("'", "");
};

function sentry(req, res) {
  // Since sentry has a limit of 50 records per call, we will
  // need to perform `pagination` and cycle through every URL.
  // The request that comes back from sentry is not a valid object
  // and it was easier to call the API twice than to try and subString/whatever
  // the first response.
  var sentryRequest = new Promise((resolve, reject) => {
    SENTRY_API_HELPER.headers.get(CSRF_EVENT_URL, 'true', [], resolve);
  });

  // The urls that are returned from the `headers.get` request do
  // not include the CSRF_EVENT_URL. We add it here and then call
  // each URL to grab the body/response.
  sentryRequest.then((urls) => {
    var headerUrls = urls;
    headerUrls.push({url: CSRF_EVENT_URL});

    var sentryResponse = new Promise((resolve, reject) => {
      SENTRY_API_HELPER.body.get(headerUrls, [], 0, resolve);
    });

    // The result that is returned will include many duplicate domains.
    // We filter and map the results into uniqueDomains for the view.
    sentryResponse.then((result) => {
      const uniqueDomains = _.map(result.filter(_onlyUnique), (url) => {
        return _removeQuotes(url);
      });

      res.render('index', {
        domains: uniqueDomains,
        dataAvailable: true
      });
    });
  });
};

module.exports = sentry;
