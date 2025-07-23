const express=require('express');
const {getProfileData} =require('../Model/profileDataController');
const profileDataRouter =express.Router();

profileDataRouter.get("/api/profile-data", getProfileData);


module.exports =profileDataRouter;