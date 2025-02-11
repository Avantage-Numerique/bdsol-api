import {NextFunction, Request, Response} from "express";

interface SlowDownOptions {
    delay?: number;
    verbose?: boolean;
    shouldDelay?:any;
}

/**
 * Middleware that adds a configurable delay to all requests
 * @param {SlowDownOptions} options Configuration options
 * @param {number} options.delay Delay in milliseconds (default: 1000)
 * @param {boolean} options.verbose Log delay information (default: false)
 * @param {function} options.shouldDelay Custom function to determine if request should be delayed (optional)
 * @returns {function} Express middleware function
 */
const SlowDownMiddleware = (options = {} as SlowDownOptions ) => {
    const {
        delay = 3000,
        verbose = false,
        shouldDelay = () => true
    } = options;

    return async (req: Request, res: Response, next: NextFunction) => {
        const startTime = Date.now();

        if (!shouldDelay(req)) {
            return next();
        }

        try {
            await new Promise(resolve => setTimeout(resolve, delay));

            if (verbose) {
                const endTime = Date.now();
                const actualDelay = endTime - startTime;
                console.log(`Request to ${req.path} delayed by ${actualDelay}ms`);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

export default SlowDownMiddleware;
export {SlowDownOptions};

// Usage example:
/*
const express = require('express');
const slowDown = require('./slowDown');

const app = express();

// Basic usage - adds 1 second delay to all requests
app.use(slowDown());

// Advanced usage with options
app.use(slowDown({
  delay: 2000,
  verbose: true,
  shouldDelay: (req) => {
    // Only delay API requests
    return req.path.startsWith('/api');
  }
}));

// Can also be applied to specific routes
app.get('/api/slow-endpoint',
  slowDown({ delay: 3000 }),
  (req, res) => {
    res.json({ message: 'This response was delayed' });
  }
);
*/