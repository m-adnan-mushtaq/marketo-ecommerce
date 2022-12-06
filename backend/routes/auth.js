import {Router} from "express"
import { logOutHanlder, refreshRouteHanlder, signInHanlder, signUpHanlder } from "../controllers/auth.js"
import { ensureAuth } from "../middlewares/guardRoutes.js"
const router=Router()

/** ------------------------------------------------------------------------------------------------
 *  @method POST
    @desc create new user
    @route /auth/sign-up
 **/
router.post('/sign-up',signUpHanlder)
/** ------------------------------------------------------------------------------------------------
 *  @method POST
    @desc sign in user
    @route /auth/sign-in
 **/
router.post('/sign-in',signInHanlder)
/** ------------------------------------------------------------------------------------------------
    @method GET
    @desc get new access token based on refreh token
    @route /auth/signin
 **/
router.get('/refresh',refreshRouteHanlder)
/** ------------------------------------------------------------------------------------------------
    @method GET
    @desc log out user and clear refresh token cookie
    @route /auth/signin
 **/
router.get('/logout',ensureAuth,logOutHanlder)


export default router