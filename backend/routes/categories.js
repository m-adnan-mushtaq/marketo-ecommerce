import {Router} from "express"
import { addCategoryHandler, deleteCategoryHandler, getAdminCategoires, getAllCategoires, updateCategoryHandler } from "../controllers/categories.js"
import { extractUserCookie } from "../middlewares/cookieChecker.js"
import { adminMiddewares } from "../middlewares/guardRoutes.js"
const router=Router()


router.route('/')
/** ------------------------------------------------------------------------------------------------
 *  @method GET
    @desc get all categories - PUBLIC
    @route /api/cats/
 **/
.get(getAllCategoires)
/** ------------------------------------------------------------------------------------------------
 *  @method POST
    @desc add new category - PRIVATE
    @route /api/cats/
 **/
.post(adminMiddewares,addCategoryHandler)


router.use(adminMiddewares)
//------------------ get all catagires of specific admin --------------------
router.get('/admin/:id',getAdminCategoires)

//--------------------- update & delete specific category -----------------------------
router.route('/:id')
/** ------------------------------------------------------------------------------------------------
 *  @method PUT
    @desc update single cateory - PRIVATE
    @route /api/cats/:id
 **/
.patch(updateCategoryHandler)
/** ------------------------------------------------------------------------------------------------
 *  @method DELETE
    @desc delete single cateory - PRIVATE
    @route /api/cats/:id
 **/
.delete(deleteCategoryHandler)

export default router