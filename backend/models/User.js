import {Schema,model} from "mongoose"
import {hash,compare} from "bcrypt"
import Product from "./Product.js";
import Category from "./Category.js";
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        minLength:3,
        index:true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9 ]+$/.test(v);
            },
            message: props => `${props.value} must contains [aA-zZ] letters and spaces only!`
          },
          required: [true, 'Name Field is required']
    },
    email:{
        type:String,
        unique:true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
          },
          required: [true, 'Email Field is required!']
    },
    password:{
        type:String,
        required:[true,'Passsword Field is required!'],
        minLength:[5,'minimum 5 characters needed!'],
        select:false
    },
    role:{
        type:String,
        default:'CUSTOMER',
        uppercase:true,
        required:true,
        enum:['CUSTOMER','ADMIN','SUPERADMIN']
    }
})


//instance methods
userSchema.methods.compareHash=function (password) {
    return compare(password,this.password)
}

//middlwares
userSchema.statics.hashPassword= function (password) {
    return hash(password,10)
}



// whenever user deleted delete all it's catagories and products
userSchema.pre('deleteOne', async function (next) {
    try {
        //grab user id
        const userId = this.getQuery()._id
        console.log(this.getQuery());
        if(!userId) throw Error('No user id found!')

        // delete all products
        const ptCount = await Product.deleteMany({createdBy:userId}).exec()
        // delete all catagories
        const catCount = await Category.deleteMany({createdBy:userId}).exec()
        console.log(ptCount,catCount);
        next()
    } catch (error) {
        next(error)
    }
})
const User= model('User',userSchema)
export default User
