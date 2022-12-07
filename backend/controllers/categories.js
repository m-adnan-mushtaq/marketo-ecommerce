import { isValidObjectId } from "mongoose";
import Category from "../models/Category.js"



// get all categories added
async function getAllCategoires(req, res) {
    try {
        // 
        // get all cats added yet
        const cats= await Category.find().exec()
        res.json(cats)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
}

async function getAdminCategoires(req, res) {
    try {
        // find all categories
        const adminId= req.params.id
        // console.log(adminId);
        if(!adminId || !isValidObjectId(adminId)) throw Error('No Admin found!')
        // get all public and private cats
        const query={
            createdBy:adminId
            // $or:[
            //     {createdBy:{$exists:false}},
            // ]
        }
        // if(adminId){
        //     query['$or'].push({
        //         createdBy:adminId
        //     })
        // }
        // console.log(JSON.stringify(query));
        const cats= await Category.find(query)
        res.json(cats)
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            error: error.message,
        });
    }
}


// add new category handler

async function addCategoryHandler(req, res) {
    try {
        const {name} = req.body
        if(!name) throw Error('Invalid Credentials')
        const cat=await  Category.create({
            name,
            createdBy:req.user._id
        })
        res.status(201).json({success:true,id:cat._id})
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: error.message,
        });
    }
}
async function updateCategoryHandler(req, res) {
    try {
        const {name} = req.body
        const {id}= req.params
        if(!name || !id) throw Error('Invalid Credentials')
        const updateCat=await Category.findOneAndUpdate({
            _id:id
        },
        {
            name
        }).exec()

        res.status(201).json({success:true,id:updateCat._id})
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: error.message,
        });
    }
}
async function deleteCategoryHandler(req, res) {
    try {
        const {id}= req.params
        if( !id) throw Error('Invalid Credentials')
        const delFeedBack=await Category.deleteOne({_id:id}).exec()
        // console.log(delFeedBack);

        res.status(204).json()
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: error.message,
        });
    }
}

export {getAllCategoires, addCategoryHandler, updateCategoryHandler ,deleteCategoryHandler , getAdminCategoires}