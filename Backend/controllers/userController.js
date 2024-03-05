const User = require("../models/User"); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const validator = require('validator'); 
const nodemailer = require('nodemailer'); 
const crypto = require('crypto'); 

// Function to register a new user
const Register = async (req, res) => { 
    try {
        // Extract user data from request body
        const { username, password, email, role } = req.body; 
        
        // Check if required data is missing
        if (!username || !password || !email) {
            return res.status(422).json({ errors: [{ msg: "Missing data" }] });
        }
        
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(422).json({ errors: { email: 'Invalid email' } });
        }
        
        // Check password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(422).json({ errors: { password: 'Weak Password' } });
        }

        // Check if user with the same email already exists
        const newUser = await User.findOne({ email });    
        if (newUser) {
            return res.status(403).send({ auth: false, message: "Email already exists." });  
        }
        
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({ username, password: hashedPassword, email, role }); 
        await user.save(); 
        
        // Generate JWT token for authentication
        const token = jwt.sign({ username: user.username,email: user.email,role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" }); 
        
        // Send response with user details and token
        res.status(201).json({ username: user.username, email, token }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message }); 
    }
}

// Function to authenticate user login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ msg: "Invalid Email." });
        }
  
        // Compare input password with hashed password stored in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password" });
        }
  
        // Generate JWT token for authentication
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ username: user.username, email: user.email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Function to find a user by ID
const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Find user by ID in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "No User Found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

// Function to get all users
const getUsers = async (req, res) => {
    try {
        // Find all users in the database
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

// Function to request a password reset
const requestReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Generate unique code for password reset
        const code = crypto.randomBytes(20).toString('hex');
        user.resetPasswordCode = code;
        user.resetPasswordExpires = Date.now() + 300000;  // 5 minutes from now
        await user.save();

        // Create transporter for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Configure email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You have requested the reset of the password for your account.\n\n
                   Please click on the following link: http://localhost:3000/users/api/password/reset/verify/${code}\n\n
                   The link will expire in 5 minutes.\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        // Send password reset email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to validate a password reset token/code
const validateReset = async (req, res) => {
    try {
        const code = req.params.code;
        
        // Find user by reset password code and check expiration time
        const user = await User.findOne({
            resetPasswordCode: code,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.status(200).json({ message: 'Code verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to reset user's password
const passwordReset = async (req, res) => {
    try {
      const code = req.params.code;
      const newPassword = req.body.password;
  
      // Find user by reset password code and check expiration time
      const user = await User.findOne({
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password and update user's password in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordCode = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      // Generate JWT token for authentication
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Send response with user details and token
      res.status(200).json({ username: user.username, email: user.email, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
// Export all functions for use in other modules
module.exports = { Register, Login, findUser, getUsers, requestReset, validateReset, passwordReset };