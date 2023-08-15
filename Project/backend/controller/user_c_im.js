let user=require("../models/user_m_im");


//add new user

const add_user=async(req,res)=>{ //async is used to make asynchronous function 


    

    const {idNo,fullName,address,description,city,age,id_img_1_url,
        id_img_2_url,userRole,accessType,gender,phoneNo,district}=req.body;

    const new_user=new user({ //creating new user model

        idNo, //assigning values to the user model
        fullName, 
        address, 
        description,
        city,
        age,
        id_img_1_url,
        id_img_2_url,
        userRole,
        accessType,
        gender,
        phoneNo,
        district
    })

    await new_user.save().then(()=>{ //save the user model to the database
        res.json("New User has been added succesfully..!"); //res.json is used to send json response
    }).catch((err)=>{ //catching errors
        console.log(err); //printing errors
        res.json("Somthing went wrong.."); //res.json is used to send json response
    })

}


//fetch all user

const get_user=async(req,res)=>{ //async is used to make asynchronous function

 await user.find().then((users)=>{ //find all the users in the database
    res.json(users); //res.json is used to send json response
 }).catch((err)=>{ //catching errors

    console.log(err);
    res.json("somthing went wrong..");

 })

}

//update user

const update_user=async(req,res)=>{ //async is used to make asynchronous function


    let userId=req.params.id;
    const {idNo,fullName,address,description,city,age,id_img_1_url,
        id_img_2_url,userRole,accessType,gender,phoneNo,stock,district}=req.body;
    const updateuser={
        idNo,
        fullName,
        address,
        description,
        city,
        age,
        id_img_1_url,
        id_img_2_url,
        userRole,
        accessType,
        gender,
        phoneNo,
        district
    }

    const update=await user.findByIdAndUpdate(userId,updateuser).then(()=>{

        res.status(200).send({status:"User has been succesfully Updated"})

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({ status: "Error with updating user", er: err.message });

    })

}

//delete user

const delete_user=async(req,res)=>{

    let userId=req.params.id;
    await user.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User has been deleted succesfully..!"});

    }).catch((err)=>{

        res.status(500).send({status:"Error with delete User",error:err.message});

    })


}

//get one user

const get_one_user=async(req,res)=>{

    let userId=req.params.id;
    await user.findById(userId).then((users)=>{
        res.json(users);
    }).catch((err)=>{

        res.status(500).send({status:"Error with get user",error:err.message});

    })

}

//get one user using id_no

const get_one_user_id=async(req,res)=>{

   
    let userCode=req.params.ucode;
    await user.find({idNo:userCode}).then((users)=>{
        res.json(users);
    }).catch((err)=>{

        res.status(500).send({status:"Error with get user",error:err.message});

    })
   


}

//update one user using id no


const update_user_id=async(req,res)=>{


    let usercode=req.params.ucode;
    const {idNo,fullName,address,description,city,age,id_img_1_url,
        id_img_2_url,userRole,accessType,gender,phoneNo,stock,district}=req.body;
    const updateuser={
        idNo,
        fullName,
        address,
        description,
        city,
        age,
        id_img_1_url,
        id_img_2_url,
        userRole,
        accessType,
        gender,
        phoneNo,
        district
    }

    const filter = { idNo:usercode};


    const update=await user.findOneAndUpdate(filter,updateuser).then(()=>{

        res.status(200).send({status:"user has been succesfully Updated"})

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({ status: "Error with updating user", er: err.message });

    })

}



//search user admin side

const search_user_im=async(req,res)=>{
   let searchKey=req.params.key;
    await user.find({
        "$or":[
            {
                idNo:{$regex:searchKey}
            },
            {
                fullName:{$regex:searchKey}
            }
        ]
    }).then((users)=>{
        
        res.json(users);
    }).catch((err)=>{
        res.status(500).send({status:"Error with Search Users",error:err.message});

    })


}

module.exports={

    add_user,
    get_user,
    update_user,
    delete_user,
    get_one_user,
    get_one_user_id,
    search_user_im,
    update_user_id
    
}

