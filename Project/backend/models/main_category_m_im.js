const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mainCategorySchema=new Schema({
    
    main_category_code:{

        type:String,
        required:true

    },
    main_category_name:{
        type:String,
        required:true
    },
    status:{
       type:Boolean,
       required:true

    },
    icon_url:{
       
        type:String,
        required:true

     }





})

const main_category=mongoose.model("maincategory",mainCategorySchema);
module.exports=main_category;