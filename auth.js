var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var connection = require('./connection');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("my password", salt);
var secretKey = 'Slim Motherfucker Shady';

exports.getToken = function(user) {
    return jwt.sign(user, secretKey,
        {expiresIn: 3600});
};

exports.verifyUser = (req,res,next)=>{
    var authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secretKey, (err,user)=>{
        if(err) {
            return res.sendStatus(403)
        }else{
            req.user = user
            next()
        }
    })
};

exports.verifyAdmin = (req,res,next)=>{
    var authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secretKey, (err,user)=>{
        if(err) {
            return res.sendStatus(403)
        }else{
            req.user = user
            next()
        }
    })
};

exports.verifyPenyedia = (req,res,next)=>{
    var authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secretKey, (err,user)=>{
        if(err) {
            return res.sendStatus(403)
        }else{
            req.user = user
            next()
        }
    })
};

exports.verifyPencari = (req,res,next)=>{
    var authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secretKey, (err,user)=>{
        if(err) {
            return res.sendStatus(403)
        }else{
            req.user = user
            next()
        }
    })
};