/**
 * Created by mnace on 7/3/2017.
 */
var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/'));
server.listen(8080);
