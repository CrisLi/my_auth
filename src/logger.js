const fs = require('fs');
const path = require('path');
const pino = require('pino');
const { multistream } = require('pino-multi-stream');

const logDir = path.resolve(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdir(logDir);
}

const streams = [
  { stream: fs.createWriteStream(path.resolve(logDir, 'app.log')) },
  { level: 'error', stream: fs.createWriteStream(path.resolve(logDir, 'error.log')) },
  { level: 'info', stream: process.stdout, prettyPrint: true }
];

const logger = pino({
  prettyPrint: true
});
// }, multistream(streams));

module.exports = logger;
