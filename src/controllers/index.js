// Controller for root url `/`.
// Nothing fancy here

function home(req, res) {
  res.render('index', {dataAvailable: false});
};

module.exports = home;
