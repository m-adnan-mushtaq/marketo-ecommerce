import { verifyJwtRefreshToken } from "../utils/token.js"

async function extractUserCookie(req,res,next) {
    try {
        //try to get user from cookie if availabe
        let token= req.signedCookies?.jwt
        if(token){
            const {userId}= await verifyJwtRefreshToken(token)
            req.userId=userId
        }
        next()
    } catch (error) {
        next(error)
    }
}


export {extractUserCookie}