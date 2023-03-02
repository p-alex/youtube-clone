import { rateLimit } from 'express-rate-limit';

const limiterErrorResponse = (message: string) => {
  return { success: false, errors: [{ message }], result: null };
};

export const homepageVideosLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: limiterErrorResponse('To many requests for videos... Try again in 1 min.'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 6,
  message: limiterErrorResponse(
    'Too many account creation attempts from this IP, please try again after 1 hour'
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: limiterErrorResponse(
    'Too many login tries, please try again after 15 minutes'
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

export const addCommentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 6,
  message: limiterErrorResponse(
    'Too many comments added, please try again after 1 minute'
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

export const commentEditLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 25,
  message: limiterErrorResponse(
    'Too many comments edited, please try again after 1 minute'
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: limiterErrorResponse('Too much searching, please try again after 1 minute'),
  standardHeaders: true,
  legacyHeaders: false,
});

export const verifyEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: limiterErrorResponse('Too many tries, please try again after 15 minutes'),
  standardHeaders: true,
  legacyHeaders: false,
});
