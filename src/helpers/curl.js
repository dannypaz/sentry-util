const Curl = require('node-libcurl').Curl;

const SENTRY_API_TOKEN = process.env.SENTRY_API_TOKEN || 'NO TOKEN FOUND';
const ENVIRONMENT = process.env.ENV || 'production';

// `curlRequest` takes the following parameters
// url: Request URL
// useHeader: boolean. Specifies if a header needs to be present in the Request
// callback: function that handles the curl response
function curlRequest(url, useHeader, callback) {
  const curl = new Curl();
  curl.setOpt('URL', url);

  // If this is true, Headers will be present in both a `headers` param
  // and appended to the response body.
  if (useHeader) {
    curl.setOpt('HEADER', true);
  }

  // In order to make a request to sentry
  // we must provide a URL and a user string which consists
  // of the API_TOKEN and a colon. The colon is used to specify
  // that we do not have a password (not required by sentry)
  curl.setOpt('USERPWD', SENTRY_API_TOKEN + ':');

  // Only include detailed logs if server is being run from dev
  if (ENVIRONMENT == 'development') {
    curl.setOpt('VERBOSE', true);
  }

  curl.on('end', (status, body, headers) => {
    curl.close.bind(curl);
    callback(status, body, headers);
  });

  curl.on( 'error', () => {
    curl.close.bind(curl);
    throw Error('curl command failed for url: ' + url);
  });
  
  curl.perform();
};

module.exports = curlRequest;
