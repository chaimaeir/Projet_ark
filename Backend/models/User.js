const mongoose=require('mongoose');

const userSchema=new  mongoose.Schema({
    username:{type:String,required:true},
    email:{ type : String , unique : true , required : true },
    password:{type:String,required:true ,min:6},
    resetPasswordCode: {type: String,default: ''},
    resetPasswordExpires: {type: Date,default: Date.now()},
    role: { type : String , enum: ['admin', 'user' ],default: 'user' },
    oauthID: {type:String},
    displayName: {type:String}
},{
    timestamps: true 
});

const User =  mongoose.model("User", userSchema);
module.exports = User; 