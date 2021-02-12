// // const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const transport = new winstonRotator({
    'name': 'access-file',
    'level': 'info',
    'filename': `./logs/bid.log`,
    'json': true,
    'prepend': true
});

const logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [transport]
});

module.exports = {
    'logger': logger
};