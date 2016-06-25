'use strict';


let webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  config = require('./webpack.config'),
  path = require('path');

let server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
});

// Important part. Send down index.html for all requests
server.use('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(8080, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err, result);
  }

  console.log('Listening at localhost:8080');
});
