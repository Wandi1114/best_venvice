const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (res, res, cb) => {
      cb(null,'.public/images/dp_pencari_jasa');
    },
    filename: (req, res, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    }
  })
  
const upload = multer({storage: fileStorage});