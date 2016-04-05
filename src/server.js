const express = require('express');
const mustacheExpress = require('mustache-express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// Simple log for each request
app.use((req, res, next) => {
  console.log('Request: ', req.url);
  next();
});

// Load routes
routes(app);

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});
