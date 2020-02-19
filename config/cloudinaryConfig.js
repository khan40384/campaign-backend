const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'df8usowto',
api_key: '431755754857734',
api_secret: 'BzcvsT2y9GW5qkvlrlZixJKyOgY'
});

exports.uploads = (file) =>{
return new Promise(resolve => {
cloudinary.uploader.upload(file, (result) =>{
resolve({url: result.url, id: result.public_id})
}, {resource_type: "auto"})
})
}