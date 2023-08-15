let main_category=require("../models/main_category_m_im");

//add new main category

 const add_main_category=async(req,res)=>{

   const {main_category_code,main_category_name,status,icon_url}=req.body;

   const new_main_category=new main_category({

    main_category_code,
    main_category_name,
    status,
    icon_url
   
   })

   await new_main_category.save().then(()=>{

    
    res.json("New Category Added Succesfully..!!");


   }).catch((err)=>{

     console.log(err);
     res.json("Somthing went wrong..");

   })
}

//fetch all main category

const getMainCategory=async(req,res)=>{

  await  main_category.find().then((category)=>{

        res.json(category);
    }).catch((err)=>{

       console.log(err);
       res.json("somthing went wrong..");

    })



}


//update main category

const updateMainCategory=async(req,res)=>{

  let mainCatId=req.params.id;
  const {main_category_code,main_category_name,status,icon_url}=req.body;
  const updateMainCategory={

    main_category_code,
    main_category_name,
    status,
    icon_url

  }

    const update=await main_category.findByIdAndUpdate(mainCatId,updateMainCategory).then(()=>{

      res.status(200).send({status:"Main Category is succesfully Updated"})

   }).catch((err)=>{
       
    console.log(err);
    res.status(500).send({ status: "Error with updating main category", er: err.message });
     
   })



}

//delete main category

const deleteMainCategory=async(req,res)=>{

    let mainCatId=req.params.id;
    await main_category.findByIdAndDelete(mainCatId).then(()=>{

        res.status(200).send({status:"Main Category has deleted succesfully..!"});
    }).catch((err)=>{

        res.status(500).send({status:"Error with delete category",error:err.message});

    })

    




}


//get one main category

const getOneMainCategory=async(req,res)=>{
  
    let mainCatId=req.params.id;

    await main_category.findById(mainCatId).then((category)=>{

        res.json(category);
    }).catch((err)=>{
        res.status(500).send({status:"Error with get main category",error:err.message});
    })

    
}

//main category search inventory side

const searchMainCategory=async(req,res)=>{

  let searchKey=req.params.key;

  await main_category.find({
    "$or":[
      {
         main_category_code:{$regex:searchKey}
      },
      {
        main_category_name:{$regex:searchKey}
      }
  ]
  }).then((category)=>{

    res.json(category);

  }).catch((err)=>{
    
    res.status(500).send({status:"Error with Search main Category",error:err.message});


  })


}




module.exports={
    add_main_category,
    getMainCategory,
    updateMainCategory,
    deleteMainCategory,
    getOneMainCategory,
    searchMainCategory
};