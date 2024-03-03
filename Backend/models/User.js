const mongoose=require('mongoose');

const userSchema=new  mongoose.Schema({
    username:{type:String,required:true},
    email:{ type : String , unique : true , required : true },
    password:{type:String,required:true ,min:6},
    role: { type : String , enum: ['admin', 'user' ],default: 'user' }
},{
    timestamps: true 
});

const User =  mongoose.model("User", userSchema);
module.exports = User;