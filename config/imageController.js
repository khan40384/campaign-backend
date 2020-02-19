//IMPORT THE MODEL WE CREATED EARLIER
var imageModel = require('../models/campaign');
//IMPORT CLOUDINARY CONFIG HERE
var cloud = require('./cloudinaryConfig');
exports.createApp = (req, res) => {
	console.log(req.file.originalname);
  var id = req.file.originalname.split("#");
  console.log(id[1]);
  req.file.originalname = id[1];

  id=id[0];
  console.log(id);
  console.log(req.file.originalname);
	//console.log(req.body);
try{
    var imageDetails = {
       imageName: req.file.originalname,
     }
//USING MONGO METHOD TO FINE IF IMAGE-NAME EXIST IN THE DB
     imageModel.find({campaignName: imageDetails.imageName, userId:id}, (err,          callback) => {
//CHECKING IF ERROR OCCURRED      
 if (err) {
           res.json({
                      err: err,
                      message: 'there was a problem uploading image'
           })
} else if(callback.length >= 1 ) {
res.json({
message: 'file already exist'
})
}else {
var imageDetails = {
imageName: req.file.originalname,
cloudImage: req.file.path,
imageId: ''
}
console.log(imageDetails);
// IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
cloud.uploads(imageDetails.cloudImage).then((result) => {
  console.log(result);
var imageDetails = {
campaignName: req.file.originalname,
imageName: req.file.originalname,
cloudImage: result.url,
imageId: result.id,
userId: id
}
//THEN CREATE THE FILE IN THE DATABASE
imageModel.create(imageDetails, (err, created)=> {
if(err){
res.json({
err: err,
message: 'could not upload image, try again'
})
}else {
res.json({
created: created,
message: "image uploaded successfully!!"
})
}
})
})
}
});
}catch(execptions){
console.log(execptions)
}
}