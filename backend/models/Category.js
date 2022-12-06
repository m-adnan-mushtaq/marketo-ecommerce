import { Schema, model } from "mongoose";
import Product from "./Product.js";

const categorySchema= new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    
    },
    createdBy:{
        type:'ObjectId',
        ref:'User'
    },
})

categorySchema.pre('deleteOne', async function (next) {
    try {
        //grab user id
        const category = this.getQuery()._id
        console.log(this.getQuery());
        if(!category) throw Error('No category id found!')

        // delete all products
        await Product.deleteMany({category}).exec()
        next()
    } catch (error) {
        next(error)
    }
})

const Category = model('Category',categorySchema)
export default Category