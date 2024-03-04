const express = require('express'); 
const controllers = require('../controllers/userController'); 
const authMiddleware = require('../middlewares/authMiddleware');

// Creating an instance of Express router
const router = express.Router();

// Route for user registration
router.post("/register", controllers.Register);

// Route for user login
router.post("/login", controllers.Login);

// Route to find a specific user by their ID
router.get("/:userId", controllers.findUser);

// Route to get all users, accessible only to admin users
router.get("/", authMiddleware.isAdmin, controllers.getUsers);

// Route to request password reset
router.post('/password/reset', controllers.requestReset);

// Route to verify password reset token
router.get('/api/password/reset/verify/:code', controllers.validateReset);

// Route to reset password
router.post('/api/password/reset/:code', controllers.passwordReset);

// Exporting the router
module.exports = router;