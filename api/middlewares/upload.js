const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'laboratorios',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }] // mantém proporção 1:1
  },
});

const upload = multer({ storage });

module.exports = upload;
