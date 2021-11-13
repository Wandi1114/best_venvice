var express =  require('express')
var router = express.Router()
// const multer = require('multer')
var user = require('./controller/user')
var penyedia_jasa = require('./controller/penyedia_jasa')
var pencari_jasa = require('./controller/pencari_jasa')
var pegawai = require('./controller/pegawai')
var authenticate = require('./auth')
const { auth } = require('google-auth-library')


// router.route('/')
// .get("Helo world")

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     }
// })



router.route('/login-email')
.post(user.loginEmail)

router.route('/user')
.get(user.getAll)
.post(user.create)


router.route('/penyedia-jasa') //bisa
.get(penyedia_jasa.getAll)
.post(penyedia_jasa.create)

// router.route('/penyedia-jasa/:id')
// .get([penyedia_jasa.getById)


router.route('/penyedia-jasa/pegawai/')
.get(authenticate.verifyUser ,pegawai.getMyPegawai)

router.route('/penyedia-jasa/login') //bisa
.post(penyedia_jasa.loginEmail)

router.route('/pencari-jasa') //bisa
.get(pencari_jasa.getAll)
.post(pencari_jasa.create)

router.route('/pencari-jasa/:id')
.get(pencari_jasa.getById)

router.route('/pencari-jasa/login') //bisa
.post(pencari_jasa.loginEmail)

router.route('/pegawai') 
.get(pegawai.getAll)
.post(authenticate.verifyPenyedia,pegawai.create)
.post(pegawai.create)

// router.route('/')

// router.route('/admin/coba')
// .post(admin.getByid2)

// router.route('/admin/:idadmin')
// .get(admin.getByid)


module.exports = router;
