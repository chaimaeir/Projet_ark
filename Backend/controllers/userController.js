const User = require("../models/User");
const bcrypt = require('bcrypt');



const updateUser = async (req,res)=>{
  try{
     // Extract user ID from request parameters
    const userId = req.params.userId;
    const {username,email,password} = req.body;
    
    const updateData ={username,email,password} ; // Data to update
    if(password){
        const hashedPassword= await bcrypt.hash(updateData.password,10);// Hash the password before saving it
        updateData.password = hashedPassword;
    }

    // Find and update user in the database
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });

  }catch(error){
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
}


const deleteUser = async  (req,res)=> {
    try{
        const  userId=req.params.userId;
        console.log(userId);
        
        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser) {
            return res.status(404).json({message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });


    }catch(error){
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
       
    }
}

module.exports = { updateUser , deleteUser}
