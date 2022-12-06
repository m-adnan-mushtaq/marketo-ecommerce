import {Router} from "express"
import { updateUserRole , getAllUsers} from "../controllers/super-admin.js"
import { superAdminMiddlewares } from "../middlewares/guardRoutes.js"
const router=Router()


router.use(superAdminMiddlewares)

/** ------------------------------------------------------------------------------------------------
 *  @method GET
 @desc get all users  -  PRIVATE TO SUPER-ADMIN
 @route /api/super-admin/users
 **/

router.get('/users',getAllUsers) 
router.route('/update-role/:id')
/** ------------------------------------------------------------------------------------------------
 *  @method PATCH
    @desc update user role - PRIVATE
    @route /api/super-admin/update-role/:id
 **/
.patch(updateUserRole)

export default router