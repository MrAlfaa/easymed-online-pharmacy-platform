const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({

    idNo:{
        type:String,
        required:true,
    
    
        
        

    },
    fullName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{

        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true

    },
    city:{
        type:String,
        required:true
    },

    id_img_1_url:{
       
        type:String,
        required:true

    },
    id_img_2_url:{
       
        type:String,
        required:true

    },
    userRole:{
        type:String,
        required:true
 
     },
     accessType:{
        type:String,
        required:false,
        
     },
     gender:{
        type:String,
        required:false,
        
     },
     phoneNo:{
        type:Number,
        required:false,
       
     },
     stock:{
        type:Number,
        required:false,
        default:0,
        min: [0, 'Minimun quantity is zero']
     },
     district:{

        type:String,
        required:true
        
     }

      
})

const user=mongoose.model("user",userSchema);
module.exports=user;