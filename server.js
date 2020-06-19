'use strict'
// Server bootstrap
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
require(path.join(__dirname, '/api/bootscripts/preloadEnvVars.js'))();

server.use(bodyParser.json());

const routers = require('./api/routers');
routers(server);

module.exports = server;
