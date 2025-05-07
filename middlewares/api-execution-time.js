import logger from '../utils/logger.js';

export const apiExecutionTime = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`[${req.method}] ${req.originalUrl} - ${duration}ms`);
    });

    next();
};
