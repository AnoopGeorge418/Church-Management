const express = require('express');
 const familyController = require('../Model/addFamily');

 const familyRouter = express.Router();

 // Route for saving a new family
 familyRouter.post('/api/family',familyController.saveFamily);
 familyRouter.get('/api/searchFamily',familyController.searchFamily);
 familyRouter.get('/api/EditsearchFamily', familyController.EditsearchFamily );
 familyRouter.put('/api/updatePerson', familyController.updatePerson);
 familyRouter.put('/api/updatenewife', familyController.updatenewife);

 familyRouter.post('/api/families/addChild', familyController.addChild);
 familyRouter.get('/api/families/token', familyController.getFamilyData); 
familyRouter.put('/api/families/togglebutton', familyController.toggleFamilyActiveStatus)
familyRouter.post('/api/families/user/searchfamily', familyController.userFamilySearch);
familyRouter.get('/api/familyStatistics', familyController.getFamilyStatistics);
familyRouter.get('/api/piechart',familyController.getFamilyPieChartData);


 module.exports =  familyRouter;