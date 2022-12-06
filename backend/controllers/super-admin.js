import User from "../models/User.js"

//get all users
export async function getAllUsers(req,res) {
    try {
        // grab all users
        const users= await User.find({_id:{
            $ne:req.user._id
        }}).exec()
        res.json(users)
        

    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
}

//update user role
export async function updateUserRole(req,res) {
    try {
        // get update credentials
        const userId= req.params.id
        if(!userId) throw Error("Invalid user id!")
        const role = req.body?.role
        if(!role) throw Error('Invalid Credentials!')
        let allowedRoles= ['ADMIN','SUPERADMIN']
        if(!allowedRoles.includes(role)) throw Error('Invalid role value')
        await User.findOneAndUpdate({_id:userId},{role}).exec()
        res.status(204).json()

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}
