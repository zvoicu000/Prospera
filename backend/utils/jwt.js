const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Generate a signed JWT for a given user id.
 * @param {string} userId
 * @returns {string} token
 */

exports.signToken = (userId) => {
    if(!process.env.JWT_SECRET){
        throw new Error('JWT_SECRET is not set')
    }
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:'1h'}
    )
}