import { Schema, model } from "mongoose";

const productSchema= new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    
    },
    createdBy:{
        type:'ObjectId',
        ref:'User'
    },
    price:{
        type:Number,
        min:1
    },
    imageType:{
        type:String,
        // required:true,
        validate: {
            validator: function(v) {
              return /image\/*/.test(v);
            },
        }
    },
    image:{
        type:Buffer,
        // required:true,
    },
    category:{
        type:'ObjectId',
        required:true
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true
    }
})

productSchema.virtual('imagePath').get(function(){
    if (this.image != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
      }
})
const Product = model('Product',productSchema)
export default Product