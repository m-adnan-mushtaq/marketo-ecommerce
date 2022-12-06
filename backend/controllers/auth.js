import User from "../models/User.js"
import { generateAcessJwtToken, generateRefreshJwtToken, verifyJwtRefreshToken } from  "../utils/token.js"

async function signUpHanlder(req, res) {
    {
        try {
            //create account handler
            const { name, email, password ,role} = req.body
            if (!name || !email || !password || password.length < 5 || !role) throw Error('Invalid Credentials!')
            const hashedPassword= await User.hashPassword(password)
            const user = await User.create({ name, email,password: hashedPassword,role })
            res.status(201).json({
                success: true,
                id: user._id,
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({
                error: error.message
            })
        }
    }
}


async function signInHanlder(req, res) {
    {
        try {
            //create account handler
            const { email, password } = req.body
            if (!email || !password || password.length < 5) throw Error('Invalid Credentials!')
            //find user
            let user = await User.findOne({ email }).select('+password').orFail(new Error('Email or Password is invalid!'))
            //compare password
            if (!await user.compareHash(password)) throw Error('Email or Password is Invalid')
            //get access token
            const accessToken = await generateAcessJwtToken({
                "userInfo": {
                    id: user._id, name: user.name, email: user.email
                },
            })


            const refreshToken = await generateRefreshJwtToken({ "userId": user._id })
            // generate refresh token and store it the cookie
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                signed: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 3600 * 1000,// 7 days,
                secure: true
            })

            user = user.toObject()
            let { password: key, ...loggedUser } = user
            res.status(200).json({
                accessToken,
                user: loggedUser
            })
        } catch (error) {
            console.error(error.message)
            res.status(400).json({
                error: error.message
            })
        }
    }
}

async function refreshRouteHanlder(req, res) {
    {
        try {
            //create account handler
            // console.log('refresh token request got received');
            // console.log(req.cookies);
            // console.log(req.signedCookies);
            //get cookie
            let refreshToken = req.signedCookies['jwt']
            if (!refreshToken) throw Error('No Token Cookie found!')

            //verify refresh token
            const payload = await verifyJwtRefreshToken(refreshToken)

            //now find user if it exists
            const user = await User.findById(payload['userId']).orFail()
            const accessToken = await generateAcessJwtToken({
                "userInfo": {
                    id: user._id, name: user.name, email: user.email
                },
            })

            res.status(200).json({
                accessToken,
                user
            })
        } catch (error) {
            console.error(error.message)
            res.status(401).json({
                error: error.message
            })
        }
    }
}


function logOutHanlder(req, res) {
    // console.log(req.cookies);
    // console.log(req.signedCookies);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json()
}
export { signUpHanlder, signInHanlder, refreshRouteHanlder, logOutHanlder }