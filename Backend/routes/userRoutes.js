const express = require('express'); 
const controllers = require('../controllers/userController'); 
const authenticateToken = require('../middlewares/authMiddleware');


// Creating an instance of Express router
const router = express.Router();

// Route for user registration
router.post("/register", controllers.Register);

// Route for user login
router.post("/login", controllers.Login);

// Route for user Logout
router.post('/logout', controllers.Logout);

// Route to find a specific user by their ID
router.get("/:userId", controllers.findUser);

// Route to get all users, accessible only to admin users
router.get("/", authenticateToken , controllers.getUsers);

// Route to request password reset
router.post('/password/reset', controllers.requestReset);

// Route to verify password reset token
router.get('/api/password/reset/verify/:code', controllers.validateReset);

// Route to reset password
router.post('/api/password/reset/:code', controllers.passwordReset);

//route for updating user
router.put('/:userId' ,controllers.updateUser) 

//route for deleting user 
router.delete('/:userId', controllers.deleteUser)



// Exporting the router
module.exports = router;



