const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const auth = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./logger');
const db = require('./db');
const services = require('./services');
const appHooks = require('./hooks/app.hooks');

const app = express(feathers());

app.configure(configuration());

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(db);
app.configure(express.rest());
app.configure(auth(app.get('auth')));
app.configure(jwt(app.get('jwt')));
app.configure(local(app.get('local')));
app.configure(services);

app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
