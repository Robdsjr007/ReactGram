const fs = require('fs');
const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")) {
            folder = "photos" 
        }

        const uploadPath = path.join(__dirname, '..', 'uploads', folder);

        // Cria o diretório se não existir
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png and jpg formats
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload };