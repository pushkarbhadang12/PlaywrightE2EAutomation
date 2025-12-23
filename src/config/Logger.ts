import winston from 'winston';

const Logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        }),
        new winston.transports.File({ 
            filename: 'test-results/Logs/logs.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        }), 
    ],
});

const TEST_SEPARATOR = '#################################################################################';

export default class Log {
    public static testBegin(test: string) {
        Logger.info(TEST_SEPARATOR);
        Logger.info(`${test} - Started`);
    }

    public static testEnd(test: string) {
        Logger.info(`${test} - Ended`);
        Logger.info(TEST_SEPARATOR);
    }   

    public static info(message: string) {
        Logger.info(message);
    }   

    public static error(message: string) {;
        Logger.error(message);
    }

}