'use strict';

// Dependencies
// -----------------------------------------------------
var express         = require('express');
var port            = 8080;
var app             = express();

// Express Configuration
// -----------------------------------------------------

app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
