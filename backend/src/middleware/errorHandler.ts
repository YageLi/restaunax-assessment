import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../shared/types';

interface HttpClientError extends Error {
  status: number;
}

/**
 * Errors raised by Express middleware (e.g. malformed JSON bodies from express.json())
 * carry a 4xx `status`; those are the client's fault and safe to report back.
 */
const isHttpClientError = (err: unknown): err is HttpClientError =>
  err instanceof Error &&
  'status' in err &&
  typeof err.status === 'number' &&
  err.status >= 400 &&
  err.status < 500;

/**
 * Catch-all for unmatched routes - responds with JSON instead of Express's default HTML page.
 */
export const notFoundHandler = (req: Request, res: Response<ApiError>) => {
  res.status(404).json({ error: 'Not found', message: `Route ${req.method} ${req.path} does not exist` });
};

/**
 * Centralized error handler - Express identifies it by its 4-argument signature.
 * Unexpected errors are logged server-side and reported as a generic 500, so internals never leak.
 */
export const errorHandler = (err: unknown, _req: Request, res: Response<ApiError>, _next: NextFunction) => {
  if (isHttpClientError(err)) {
    res.status(err.status).json({ error: 'Bad request', message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
