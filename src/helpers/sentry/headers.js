const _ = require('lodash');
const parse = require('parse-link-header');
const curlRequest = require('../curl');

// The sentry API limits returned records at 50 per request.
// A work around for this is to fake `pagination` by using
// the information Sentry sends back in it's request headers.
//
// The Sentry API passes back a `link` object/string in the header
// which specifies pagination urls that we will use to make subsequent
// requests and return all the data we need.
function getHeaders(url, next, paginationUrls, resolve) {
  if (next == 'true') {

    // We pass `true` into curlRequest to specify that we
    // want headers returned in the response
    curlRequest(url, true, (status, data, headers) => {

      // `headers` returns pagination information in Link
      // which is returned to us as a comma/semicolon delimited
      // string. We are using `parse-link-header` to parse this
      // information.
      const link = parse(headers[0].Link);

      if(typeof link.next !== 'undefined') {
        paginationUrls.push(link.next);
        getHeaders(link.next.url, link.next.results, paginationUrls, resolve);
      }
    });
  } else {
    resolve(paginationUrls);
  }
};

module.exports = getHeaders;
