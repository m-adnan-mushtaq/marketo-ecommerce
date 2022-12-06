import {Router} from "express"
import { deleteUser, updateUserProfile } from "../controllers/users.js"
import { ensureAuth } from "../middlewares/guardRoutes.js"
const router=Router()


router.use(ensureAuth)
/** ------------------------------------------------------------------------------------------------
 *  @method PATCH
    @desc update user profile -  PRIVATE
    @route /users/:id
 **/
router.route('/:id')
.patch(updateUserProfile)
/** ------------------------------------------------------------------------------------------------
 *  @method DELETE
    @desc delete user profile -  PRIVATE
    @route /users/:id
 **/
.delete(deleteUser);
export default router