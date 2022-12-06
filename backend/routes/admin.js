import {Router} from "express"
import { getDashboardData } from "../controllers/admin.js"
import { adminMiddewares } from "../middlewares/guardRoutes.js"
const router=Router()


router.use(adminMiddewares)

/** ------------------------------------------------------------------------------------------------
 *  @method GET
 @desc get dashboard overview  -  PRIVATE 
 @route /api/admin/overview
 **/

router.get('/overview',getDashboardData) 

export default router