'use strict';

const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;
const server = require('http').createServer(app);

server.listen(port, function () {
    console.log('server is listening on ' + port)
});
