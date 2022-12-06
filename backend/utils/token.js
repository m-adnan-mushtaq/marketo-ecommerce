import {  readFile}  from "fs"
import {promisify}  from "util"
import jwt  from 'jsonwebtoken'
//promise versions
const fileReadUtil=promisify(readFile)
const sign=promisify(jwt.sign)
const verify=promisify(jwt.verify)

/**  function for generating jwt access token by implementing RSA256 alog with private key
 @param {Object} payload data for jwt token payload
 @returns {Promise}
*/

async function generateAcessJwtToken(payload) {
    try {
        if(!payload) return
        const privateKey= await fileReadUtil('./jwtRS256.key')

        return sign(payload,privateKey,{algorithm:'RS256',expiresIn:'15min'})
    } catch (error) {
        throw Error(error)
    }
}

/**  function for generating jwt refresh token 
 @param {Object} payload data for jwt refresh token payload
 @returns {Promise}
*/

async function generateRefreshJwtToken(payload) {
    try {
        if(!payload) return
        return sign(payload,process.env.REFRESH_SECRET_KEY,{expiresIn:'2d'})
    } catch (error) {
        throw Error(error)
    }
}


/**
 * verify your jwt token into payload
 * @param {String} token token to decoded to the payload
 * @returns {Promise}
 */
async function verifyJwtAccessToken(token) {
    try {
        if(!token) return
        const publicKey= await fileReadUtil('./jwtRS256.key.pub')
        return verify(token,publicKey)
    } catch (error) {
        throw Error(error)
    }
}

/**
 * verify your jwt token into payload
 * @param {String} token token to decoded to the payload
 * @returns {Promise}
 */
async function verifyJwtRefreshToken(token) {
    try {
        if(!token) return
        return verify(token,process.env.REFRESH_SECRET_KEY)
    } catch (error) {
        throw Error(error)
    }
}


export  {verifyJwtAccessToken , verifyJwtRefreshToken,generateAcessJwtToken , generateRefreshJwtToken}
