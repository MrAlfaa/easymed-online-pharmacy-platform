import "./UserAdd_im.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import { api } from "../../config";
import { useNavigate, useParams } from "react-router-dom";




function UserAdd_im(){

    const [idNo,setidNo]=useState("");
    const [fullName,setfullName]=useState("");
    const [description,setdescription]=useState("");
    const [address,setaddress]=useState("");
    const [age,setage]=useState(null);
    const [city,setcity]=useState("");
    const [id_img_1_url,setImage1]=useState("");
    const [id_img_2_url,setImage2]=useState("");
    const [userRole,setuserRole]=useState(true);
    const [accessType,setaccessType]=useState(false);
    const [gender,setgender]=useState(false);
    const [phoneNo,setphoneNo]=useState(null);
    const [district,setdistrict]=useState("");
    const [categoryoption,setCategoryoption]=useState([]);
    const navigate = useNavigate();
    const params = useParams();







   useEffect(() => {
           
    setidNo("");
    setfullName("");
    setdescription("");
    setaddress("");
    setage("");
    setphoneNo("");
    setuserRole(true);
    setImage1("");
    setImage2("");

           

    const getCategory = async () => {

        const result = await axios.get(`${api}/maincategory/get_main_category`);
        setCategoryoption(result.data);
       
    

    }

    const getuser=async()=>{

        const result=await axios.get(`${api}/user/get_one_user/${params.id}`);

        const item=result.data;
        
        setidNo(item.idNo);
        setfullName(item.fullName);
        setdescription(item.description);
        setaddress(item.address);
        setage(item.age);
        setcity(item.city);
        setImage1(item.id_img_1_url);
        setImage2(item.id_img_2_url);
        setuserRole(item.userRole);
        setaccessType(item.accessType);
        setgender(item.gender);
        setphoneNo(item.phoneNo);
        setdistrict(item.district);




    }

    if(params.id){
        getuser();
    }

      

    
    getCategory();


}, [params.id])
const handleUploadone = async (e) => {

  const file = e.target.files[0];
  
  const formData = new FormData();
  formData.append("image", file);
  const result1 = await axios.post(`${api}/user/upload`, formData);

    setImage1(result1.data.path);
    console.log(result1.data.path)
 
  

}

const handleUploadtwo = async (e) => {

  const file = e.target.files[0];
  
  const formData = new FormData();
  formData.append("image", file);
  const result1 = await axios.post(`${api}/user/upload`, formData);

    setImage2(result1.data.path);
    console.log(result1.data.path)
 
  

}


function senduserData(e){
  e.preventDefault();

  const user={
     
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

  if(params.id){

     axios.put(`${api}/user/update_user/${params.id}`,user).then(()=>{

        toast.success("User is successfully Updated..!!");
        setTimeout(() => {

          navigate("/inventory/p_list");
      }, 1000);

     }).catch((err)=>{

      toast.error("This User cant be updated");
      console.log(err);
 

     })

  }
  else{



      axios.post(`${api}/user/add_user`,user).then(()=>{

        setidNo("");
        setfullName("");
        setdescription("");
        setaddress("");
        setage("");
        setphoneNo("");

        toast.success('User is successfully Added!!');
        setTimeout(() => {

         navigate("/inventory/p_list");
     }, 1000);
   }).catch((err)=>{

     toast.error("This User cant be Added");
     console.log(err);

   })



    
     
   
     

  }

}


    return(<>

<div className="col main pt-5 mt-3">

    
         
       
            
<div  className="head">
  <div>
  <h5 class="display-6 font-weight-bold text-black">{params.id ? "User Details Edit" : "User Details"}</h5>
  </div>

</div>

<hr color="black"/>






<div class="m-3">

<form onSubmit={senduserData} enctype="multipart/form-data">
<div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputuserid"  onClick={()=>{toast.error("User ID cant be changed")}}>National ID Card No</label>
      {
        params.id ? (<input type="text" minLength={10} maxLength={10} onClick={()=>{toast.error("User Id can't be changed")}}  value={idNo}  onChange={(event)=>setidNo(event.target.value)} disabled  class="form-control" id="inputuseridno" placeholder=" Ex:XXXXXXXXXX/V"/>):(<input type="text"minLength={10} maxLength={10} value={idNo} required onChange={(event)=>setidNo(event.target.value)}  class="form-control" id="inputidno" placeholder="Ex:XXXXXXXXX/V"/>)
      }
      
    </div>
    <div class="form-group col-md-6">
      <label for="inputfullName">Full Name</label>
      <input type="text" required value={fullName} onChange={(event)=>setfullName(event.target.value)}  class="form-control" id="inputfullname" placeholder="Full Name"/>
    </div>
  </div>
  <div class="form-group">
    <select class="form-control" value={district} onChange={(event)=>setdistrict(event.target.value)}  id="exampleFormControlSelect1" placeholder="Select District"> 
    <option selected>Select District</option>
    <option selected>Colombo</option>
    <option selected>Gampaha</option>
    <option selected>Kalutara</option>
    <option selected>Kandy</option>
    <option selected>Matale</option>
    <option selected>Nuwara Eliya</option>
    <option selected>Galle</option>
    <option selected>Matara</option>
    <option selected>Hambantota</option>
    <option selected>Jaffna</option>
    <option selected>Kilinochchi</option>
    <option selected>Mannar</option>
    <option selected>Vavuniya</option>
    <option selected>Mullaitivu</option>
    <option selected>Batticaloa</option>
    <option selected>Ampara</option>
    <option selected>Trincomalee</option>
    <option selected>Kurunegala</option>
    <option selected>Puttalam</option>
    <option selected>Anuradhapura</option>
    <option selected>Polonnaruwa</option>
    <option selected>Polonnaruwa</option>
    <option selected>Moneragala</option>
    <option selected>Ratnapura</option>
    <option selected>Ratnapura</option>
    

      {     

      
        categoryoption.map(item =>(

            <option key={item._id} value={item.main_category_code}>{item.main_category_name}</option>

        ))
      }
    </select>
  </div>
  <div class="form-group">
    <label for="address">Addres</label>
    <input required type="text" value={address} onChange={(event)=>setaddress(event.target.value)}  class="form-control" id="address" placeholder="Address" />
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea required value={description} onChange={(event)=>setdescription(event.target.value)}  class="form-control" id="description" rows="3" placeholder="Description" maxLength={150}></textarea>
  </div>


  <div class="form-row">
    <div class="col">
      
    <label for="city">City</label>
    <select class="form-control" value={city} onChange={(event)=>setcity(event.target.value)}  id="exampleFormControlSelect1" placeholder="Select City"> 
      <option selected >Select City</option>
      <option value="Ampara">Ampara</option>
      <option value="Anuradhapura">Anuradhapura</option>
      <option value="Badulla">Badulla</option>
      <option value="Batticaloa">Batticaloa</option>
      <option value="Beruwala">Beruwala</option>
      <option value="Chavakachcheri">Chavakachcheri</option>
      <option value="Chilaw">Chilaw</option>
      <option value="Colombo">Colombo</option>
      <option value="Dambulla">Dambulla</option>
      <option value="Dehiwala-Mount Lavinia">Dehiwala-Mount Lavinia</option>
      <option value="Embilipitiya">Embilipitiya</option>
      <option value="Galle">Galle</option>
      <option value="Gampaha">Gampaha</option>
      <option value="Gampola">Gampola</option>
      <option value="Hambantota">Hambantota</option>
      <option value="Hatton">Hatton</option>
      <option value="Ja-Ela">Ja-Ela</option>
      <option value="Jaffna">Jaffna</option>
      <option value="Kalutara">Kalutara</option>
      <option value="Kalmunai">Kalmunai</option>
      <option value="Kandy">Kandy</option>
      <option value="Kattankudy">Kattankudy</option>
      <option value="Katunayake">Katunayake</option>
      <option value="Kegalle">Kegalle</option>
      <option value="Kelaniya">Kelaniya</option>
      <option value="Kilinochchi">Kilinochchi</option>
      <option value="Kotikawatta">Kotikawatta</option>
      <option value="Kuliyapitiya">Kuliyapitiya</option>
      <option value="Kurunegala">Kurunegala</option>
      <option value="Mannar">Mannar</option>
      <option value="Matale">Matale</option>
      <option value="Matara">Matara</option>
      <option value="Minuwangoda">Minuwangoda</option>
      <option value="Monaragala">Monaragala</option>
      <option value="Moratuwa">Moratuwa</option>
      <option value="Mullaitivu">Mullaitivu</option>
      <option value="Nawalapitiya">Nawalapitiya</option>
      <option value="Negombo">Negombo</option>
      <option value="Nuwara Eliya">Nuwara Eliya</option>
      <option value="Panadura">Panadura</option>
      <option value="Peliyagoda">Peliyagoda</option>
      <option value="Point Pedro">Point Pedro</option>
      <option value="Puttalam">Puttalam</option>
      <option value="Ratnapura">Ratnapura</option>
      <option value="Sri Jayawardenepura Kotte">Sri Jayawardenepura Kotte</option>
    
    
      
    </select>
    </div>
    <div class="col">
      <label for="age">Age</label> 
      <input required type="number" value={age}  onChange={(event)=>setage(event.target.value)}  class="form-control" placeholder="Enter Your Age"/>
    </div>
    <div class="col">
     <label for="phoneNo">Phone Number</label> 
      <input required type="number"  value={phoneNo} onChange={(event)=>setphoneNo(event.target.value)}  class="form-control" placeholder="Enter Your Phone No" maxLength={10} minLength={9}/>
    </div>
  </div>

  <div class="form-row mt-3">
    <div class="col">
      
    <label for="userRole">User Role</label>
    <select class="form-control" value={userRole} onChange={(event)=>setuserRole(event.target.value)} id="exampleFormControlSelect1" placeholder="Select User Role"> 
      
      <option selected >Select User Role</option>
      <option value="System Administrator">System Administrator</option>
      <option value="HR Manager">HR Manager</option>
      <option value="Employee Manager">Employee Manager</option>
      <option value="Customer Service Manager">Customer Service Manager</option>
      <option value="Financial Manager">Financial Manager</option>
      <option value="Customer Order And Payment Manager">Customer Order And Payment Manager</option>
      <option value="Supplier Manager">Supplier Manager</option>
      <option value="Inventory Manager">Inventory Manager</option>
      <option value="Helper">Helper</option>
     
    
    
      
    </select>
    </div>
    <div class="col">
      <label for="accessType">Access Type</label> 
      <select  class="form-control"  value={accessType} onChange={(event)=>setaccessType(event.target.value==="true")}  id="exampleFormControlSelect1" placeholder="Select Access Type"> 

      <option selected>Select Access Type</option>
      <option value={true}>Full Access</option>
      <option value={true} selected>Restricted Access</option>
      <option value={false} selected>Block</option>
    </select>
      
    </div>
    <div class="col">
     <label for="gender">Gender</label> 
     <select  value={gender} onChange={(event)=>setgender(event.target.value)}  class="form-control" id="exampleFormControlSelect1" placeholder="Select Gender"> 

<option selected>Select Gender</option>
<option value="Male">Male</option>
<option value="Female" selected>Female</option>

</select>
    </div>
  </div>
  <label class="mt-3" for="unitprice">Upload National ID Card</label> 

  <div class="form-row " >
    
    <div class="form-group col-md-6">
    <div class="custom-file">
  <input type="file" onChange={handleUploadone} class="custom-file-input" id="customFile"/>
  <label class="custom-file-label" for="customFile">National-ID Image(Front)
  
  </label>
</div>
    </div>
    <div class="form-group col-md-6">
    <div class="custom-file">
  <input type="file" onChange={handleUploadtwo} class="custom-file-input" id="customFile"/>
  <label class="custom-file-label" for="ChooseuserImage1">National-ID Image(Back)</label>
</div>
    </div>
  </div>

  <div>

    <div>

    </div>


  </div>
  <div class="form-row mt-4" >
    <div class="form-group col-md-6" style={{alignItems:"center",justifyContent:"center"}}>
     
     
{
   id_img_1_url && (<img src={`${api}${id_img_1_url}`}  class="rounded float-right w-50  " alt="..."/>)}

    </div>
    <div class="form-group col-md-6">
    
    {
   id_img_2_url && (<img src={`${api}${id_img_2_url}`}  class="rounded float-left w-50  " alt="..."/>)}

    </div>
  </div>
 

  <div class="form-row mt-4" >
    <div class="form-group col-md-6" style={{alignItems:"center",justifyContent:"center"}}>
     
    <button type="reset" class="btn  btn-lg btn-block"  style={{backgroundColor:"#0B1145",color:"white"}}>Reset Details</button>

    </div>
    <div class="form-group col-md-6">
    
    <button type="submit" class="btn  btn-lg btn-block" style={{backgroundColor:"#0B1145",color:"white"}}> {params.id ? "Save Change" : "Submit Details"}</button>

    </div>
  </div>

  

</form>

</div>



</div>


    </>)
}

export default UserAdd_im;