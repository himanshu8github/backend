const mongoose =  require('mongoose');


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required : true
    },
    lastName:{
        type: String
    },
    age:{
        type: Number,
        min: 16,   // validation
        max: 45
    },
    gender:{
        type: String,
        // enum : ["male", "female", "others"],

        validate(value){
            if(!["male", "female", "others"].includes(value))
                throw new Error("Invalid Gender");
        }
    },
    email:{
        type: String,
         required : true,
         unique : true,
         trim : true,
         lowercase: true,
         immutable: true
    },
    password:{
        type: String,
         required : true
    },
    image:{
        type: String,
        default : "This is the default image"
    },



},
{timestamps : true}
)


const UserData = mongoose.model('user', userSchema);
module.exports = UserData;