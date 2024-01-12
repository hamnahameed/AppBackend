const jwt = require('jsonwebtoken');
const mongoogse = require('mongoose');
const { jwtKey } = require('../config');
const User = mongoogse.model('User');

module.exports = (req, res , next) => {
    const {authorization} = req.headers;
    if(!authorization){ 
     return res.status(401).send({error: 'Not Authorized!'})
    }
    const token = authorization.replace('Bearer ', "");
    console.log('token', token)
    jwt.verify(token, jwtKey, async (err, payload) => {
        if(err){
            return res.status(401).send({error: 'Not Authorized!'})
        }

        const {userId} = payload;
        const user = await User.findById(userId);
        console.log('user', user);
        req.user = user;
        next()
    })

}
