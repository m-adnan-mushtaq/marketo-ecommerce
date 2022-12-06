import {Router} from "express"
import { createProductHandler, deleteProductHandler, getAllAdminProducts, getAllProductHandler, updateProductHandler } from "../controllers/products.js"
import { adminMiddewares } from "../middlewares/guardRoutes.js"
const router=Router()


router.route('/')
/** ------------------------------------------------------------------------------------------------
 *  @method GET
    @desc get all products - PUBLIC 
    @route /api/products/
 **/
.get(getAllProductHandler)
/** ------------------------------------------------------------------------------------------------
 *  @method POST
    @desc add new product - PRIVATE
    @route /api/products/
 **/
.post(adminMiddewares,createProductHandler)


router.use(adminMiddewares)
// //--------------------- get & update & delete specific product -----------------------------
router.get('/admin/:id',getAllAdminProducts)
router.route('/:id')
/** ------------------------------------------------------------------------------------------------
 *  @method PATCH
    @desc update single product - PRIVATE
    @route /api/products/:id
 **/
.patch(updateProductHandler)
/** ------------------------------------------------------------------------------------------------
 *  @method DELETE
    @desc delete single product - PRIVATE
    @route /api/products/:id
 **/
.delete(deleteProductHandler)

export default router