'use strict';
var express = require('express');
var logger = require('morgan');
var api = require('./routes/api');
var app = express();

app.use(logger('tiny'));
app.use('/api', api);
app.use(express.static('./client/dist'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});