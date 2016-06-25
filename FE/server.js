var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config'),
    path = require("path");

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
});

// Important part. Send down index.html for all requests
server.use('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8080');
});