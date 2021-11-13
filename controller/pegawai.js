var connection = require('../connection');

exports.getAll = (req, res)=>{
    connection.query(
        `SELECT * from pegawai`,
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

exports.getMyPegawai = (req, res)=>{
    connection.query(
        `SELECT * from pegawai where id_penyedia=?`,
        [req.user.id_penyedia_jasa],
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

exports.create = async (req,res) => {
    connection.query(
        `INSERT INTO pegawai (nama_pegawai, nik_pegawai, id_penyedia) VALUES (?, ?, ?);`,
        [req.body.nama, req.body.nik, req.user.id_penyedia],
        async (error,result)=>{
            if(error){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success:false, message: "Pegawai sudah terdaftar di tempat lain"});
                console.log(error)
            }else{
                // var token = jwt.sign({email:req.body.email}, secretKey,
                //     {expiresIn: 3600});
                // var code = otp.generate(6,{
                //     upperCase : false,
                //     alphabets : false,
                //     specialChars : false
                // });
                // mailer.register(req.body.email, code)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json({success:true, message: "Email telah dibuat"})
            }
        }
    )
}