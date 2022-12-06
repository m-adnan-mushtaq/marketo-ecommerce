import {Router} from "express"
import { getHomePageData } from "../controllers/home.js"
const router=Router()

/** ------------------------------------------------------------------------------------------------
 *  @method GET PUBLIC
    @desc get sample showcase data
    @route /api/
 **/
router.get('/',getHomePageData)


export default router