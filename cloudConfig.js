const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// this code is to access account
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME , 
  api_key:  process.env.CLOUD_API_KEY , 
  api_secret:  process.env.CLOUD_API_SECRETE
});

// this code is to storage info on clodinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderLust',
      allowedFormats: ['png' , 'jpeg' , 'jpg'], // supports promises as well
      
    },
  });


  module.exports = {
    cloudinary ,
    storage
  }  ;