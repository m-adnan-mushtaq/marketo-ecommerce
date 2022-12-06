
import { rateLimit }  from  "express-rate-limit"

const logInLimiter=rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 create account requests per `window` (here, per 15 minutes)
	message:new Error(`'Too many login attemptes created from this IP, please try again after an 15 minutes'`),
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const signUpLimiter=rateLimit({
    windowMs: 24 *60 * 60 * 1000, // 1 day
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per 1 Day)
	message:'Too many accounts created from this IP, please try again after an 1 Day',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export {logInLimiter,signUpLimiter}