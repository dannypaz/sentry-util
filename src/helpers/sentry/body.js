const _ = require('lodash');
const curlRequest = require('../curl');

function body(urls, results, count, resolve) {
  if (urls[count]) {
    const requestUrl = urls[count].url;

    // We pass `true` into curlRequest to specify that we
    // want headers returned in the response
    curlRequest(requestUrl, false, (status, data, headers) => {

      // `count` is used to track iterations on urls while still
      // providing the ability to recusively call `curlRequest`
      count += 1;

      // The data from sentry in the curl request is returned
      // as a string. We need to parse and filter to grab all
      // domains.
      const parsedData = JSON.parse(data);
      const domains = _.map(parsedData, (event) => {
        return event.context.domain;
      });

      results = results.concat(domains);
      body(urls, results, count, resolve);
    });
  } else {
    resolve(results);
  }
};

module.exports = body;
