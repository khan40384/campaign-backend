var mongoose = require('mongoose');
var imageUpload = mongoose.Schema({

imageName: {
type: String,
required: true
},

cloudImage: {
type: String,
required: true
},

campaignName: {
type: String,
required: true
},

imageId: {
type: String
},

post_date: {
type: Date,
default: Date.now
},

userId: {
	type: String,
	required: true
}

})
module.exports = mongoose.model('imageUpload', imageUpload)