const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
    },
    designation:{
        type:String,
        require:true,
        enum:["HR", "Manager", "Sales",""]
    },
    gender:{
        type:String,
        require:true,
        enum:["Male", "Female",""]
    },
    course:{
        type:String,
        require:true,
        enum:["BCA", "MCA", "BSC",""]
    },
    img:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now(),
        require:true
    }
})

module.exports = mongoose.model("Employee", employeeSchema)