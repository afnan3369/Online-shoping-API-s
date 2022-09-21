const mongoose= require("mongoose");



const usersachema = new mongoose.Schema({
    userName: {type:String, required: true},
    email: {type: String, required: true, unique:true},
    passward: {type: String, required:true},
    isAdmin:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

module.exports= mongoose.model("user", usersachema);