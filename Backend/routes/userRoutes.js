const express = require('express'); 
const controllers = require('../controllers/userController'); 

// Creating an instance of Express router
const router = express.Router();

//route for updating user
router.put('/:userId' ,controllers.updateUser) 

//route for deleting user 
router.delete('/:userId', controllers.deleteUser)

module.exports=router;