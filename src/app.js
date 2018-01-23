const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./logger');
const services = require('./services');
const appHooks = require('./hooks/app.hooks');

const app = express(feathers());

app.configure(configuration());

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());
app.configure(services);

app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
