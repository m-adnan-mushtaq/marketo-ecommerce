import {Router} from "express"
import { fetchCategoires, fetchProducts } from "../controllers/getData.js"
const router=Router()

/** ------------------------------------------------------------------------------------------------
 *  @method GET
    @desc get all categories from api and save it to data-base
    @route /auth/signup
 **/
router.get('/cats',fetchCategoires)

router.get('/products',fetchProducts)


export default router