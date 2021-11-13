var connection = require('../connection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../auth')
secretKey = 'venvice dot id'

exports.getAll = (req, res)=>{
    connection.query(
        `SELECT * from pencari_jasa`,
        (error,result)=>{
            if(error){
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json');
                res.json({success:false, message:'Terjadi kesalahan'})
            }else{
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({success:true, result:result})
            }
        }
    )
};

exports.getById = (req,res )=>{
    connection.query(
        `select * from pencari_jasa where id_pencari_jasa= ?`,
        [req.params.id],
        (error,result)=>{
            if(error){
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json');
                res.json({success:false, message:'Terjadi kesalahan'})
            }else{
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({success:true, result:result[0]})
            }
        }
    )
}

exports.create = async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    connection.query(
        `INSERT INTO pencari_jasa (nama_pencari_jasa, email_pencari_jasa,no_hp_pencari_jasa, password) VALUES (?, ?, ?, ?);`,
        [req.body.nama, req.body.email, req.body.no_hp, hashedPassword],
        async (error,result)=>{
            if(error){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success:false, message: "Email telah digunakan"});
                console.log(error)
            }else{
                var token = jwt.sign({email:req.body.email}, secretKey,
                    {expiresIn: 3600});
                // mailer.register(req.body.nama, req.body.username, token)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({success:true, message: "Email telah dibuat"})
            }
        }
    )
}

exports.loginEmail = (req, res, next)=>{
    connection.query(
        `SELECT pencari_jasa.* from pencari_jasa where email_pencari_jasa=?`,
        [req.body.email],
        async (error, rows)=>{
            if(!rows || !rows.length){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, message:'Email tidak terdaftar'});
            }else{
                if(await bcrypt.compare(req.body.password,rows[0].password)){
                    var token = auth.getToken({
                        id_pencari_jasa : rows[0].id_pencari_jasa,
                        email : rows[0].email
                    })
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, token: token, status: 'You are successfully logged in!'});
                }else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, message:'Password salah'});
                }
            }
        }
    )
}