import User from "../models/User.js"

//update user profile

async function updateUserProfile(req,res) {
    try {
        // get update credentials
        const userId= req.params.id
        if(!userId) throw Error("Invalid user id!")
        const updatedUser= await User.findOneAndUpdate({_id:userId},req.body,{new:true}).exec()
        res.status(201).json(updatedUser)

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

// delte user profile
async function deleteUser(req,res) {
    try {
        // get update credentials
        const userId= req.params.id
        if(!userId) throw Error("Invalid user id!")
        await User.deleteOne({_id:userId})
        if(req.user._id.toString()==userId.toString()){
            console.log('user is deleting his own profile!');
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        }
        res.status(204).json()

    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

export {
    deleteUser,
    updateUserProfile
}