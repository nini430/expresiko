const mongoose=require('mongoose');


const ToDoSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide a name"],
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    edit:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Todo",ToDoSchema);