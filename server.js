#!/usr/bin/env node

var express = require('express');
var app = express();
var router = require('./server/router');

//set port variable to deployed port or 8000 for local host
var port = normalizePort( process.env.PORT || 8000 );

/**
 * Normalizes a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


//set dirname to client folder to serve static assets (index.html)
app.use('/', express.static(__dirname + '/public'));

//parses all incoming data from strings to JSON
//app.use(bodyParser.json());

//Send all calls to router function
app.use(router);

app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});


