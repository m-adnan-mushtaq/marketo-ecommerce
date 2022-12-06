import Category from "../models/Category.js";
import Product from "../models/Product.js";

//get all users
export async function getDashboardData(req,res) {
    try {
        // grab all users
        const summary={}
        summary.totalProducts= await Product.count({createdBy:req.user._id})
        summary.totalCats= await Category.count({createdBy:req.user._id})
        res.json(summary)
    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
}

