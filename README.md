# CSRF Site Checker

A curl utility utilizing [Sentry's WEBAPI](https://docs.getsentry.com/hosted/api/)

This application uses [Express](http://expressjs.com/) and [node-libcurl](https://www.npmjs.com/package/node-libcurl). It was not possible to
make an Ajax request AND authenticate correctly using BASIC AUTH which is why the project is relying on curl.

#### Getting started

You will need to add a `.env` file at root and add the following variables:

    SENTRY_API_TOKEN=<Your API Token>
    SENTRY_API_URL=https://app.getsentry.com/api/0/
    PORT=<Port number for server (this is optional)
    ENV=development

Install dependencies (will automatically launch a web server)

    npm i

To start manually:

    npm start

then navigate to [Localhost:3000](http://localhost:3000), or `http://localhost:<port you had specified>`
