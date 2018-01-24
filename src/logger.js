const path = require('path');
const pino = require('pino');
const { multistream } = require('pino-multi-stream');
const rfs = require('rotating-file-stream');
const { log = {} } = require('config');

const pretty = pino.pretty();

pretty.pipe(process.stdout);

const logDir = log.dir || path.resolve(__dirname, '../logs');

const appLogStream = rfs(path.join(logDir, 'app.log'), {
  size: '5M',
  interval: '1d',
  compress: 'gzip'
});

const errorLogStream = rfs(path.join(logDir, 'error.log'), {
  size: '5M',
  interval: '1d',
  compress: 'gzip'
});

const streams = [
  { level: 'info', stream: appLogStream },
  { level: 'error', stream: errorLogStream },
  { level: 'debug', stream: pretty }
];

const logger = pino({
  level: log.level
}, multistream(streams));

module.exports = logger;
