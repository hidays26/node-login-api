const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    first_name:{
        type : String
    },
    last_name:{
        type : String
    },username:{
        type: String,
        required: true,
        unique : true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User =  mongoose.model("users",userSchema);