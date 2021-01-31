const mongoose=require('mongoose')

const EmpSchema =new mongoose.Schema({

    name : { 
        type:String, 
        required:true,
        unique:true
    }
        ,
    email : {
        type:String,
        required:true
    } ,
    dept : {
        type:String,
        required:true
    } ,
    joiningYear :{
        type:Number,
        required:true
    }

},
{collection:'employees'}
)

const EmpModel= mongoose.model('EmpModel',EmpSchema)

module.exports=EmpModel