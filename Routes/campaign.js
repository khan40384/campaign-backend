const express = require('express');
const path = require( 'path' );
var multer = require('multer');
var imageController = require('../config/imageController');
const router = express.Router();
var imageModel = require('../models/campaign');


router.post('/get', async(req, res) => {

   console.log(req.body.userId);
   try{
   imageModel.find({userId: req.body.userId}, (err, callback) => {
      //CHECKING IF ERROR OCCURRED      
       if (err) {
                 console.log(err);
                 res.status(400).json({
                  error: err
                 });
      } else if(callback.length >= 1 ) {
        console.log(callback.length);
      res.status(200).json({callback});
      }
      else{
        res.status(400).json({error: "something went wrong"});
      }
    });
 }
 catch(err){
  console.log(err);
  res.status(400).json(err);
 }
});

router.post('/getOne', async(req, res) => {

   console.log(req.body);
   try{
   imageModel.find({userId: req.body.userId, campaignName: req.body.campaignName}, (err, callback) => {
      //CHECKING IF ERROR OCCURRED      
       if (err) {
                 console.log(err);
                 res.status(400).json({
                  error: err
                 });
      } else if(callback.length >= 1 ) {
        console.log(callback.length);
      res.status(200).json({callback});
      }
      else{
        res.status(400).json({error: "something went wrong"});
      }
    });
 }
 catch(err){
  console.log(err);
  res.status(400).json(err);
 }
});

router.post('/image', async(req, res) => {

   upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
            console.log("here1");
               return res.status(500).json(err)
           } else if (err) {
            console.log("here2");
               return res.status(500).json(err)
           }
           console.log(req.file);
           imageController.createApp(req, res);
    })
  });

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        //console.log(file);
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      //console.log(file);
      cb(null, Date.now() + '-' +file.profileImage )
    }
});

var upload = multer({ storage: storage }).single('profileImage');

module.exports = router;