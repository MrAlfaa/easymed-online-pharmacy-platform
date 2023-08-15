 
 import "./InventoryDashboard.css";
 import Dashboardcard_im from "../components/common/Dashboardcard_im";
 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import { api } from "../../config";
import {Button} from '@chakra-ui/react';



 
 const InventoryDashboard = () => {
    
    const [maincategory, setMaincategory] = useState([]);
    const [user,setUser]=useState([]);
    useEffect(() => {
           
           

        const getCategory = async () => {

            const result = await axios.get(`${api}/maincategory/get_main_category`);
            setMaincategory(result.data);
            console.log(result.data);
            
        

        }

        const getuser =async()=>{

            const result=await axios.get(`${api}/user/get_user`);
            setUser(result.data);

        }


        getuser();
        getCategory();


    }, [])

  
     return (
        <div class="col main pt-5 mt-3">
         
        <nav aria-label="breadcrumb" style={{backgroundColor:"#0B1145",borderRadius:"1em"}}>
        <ol class="breadcrumb" style={{backgroundColor:"#0B1145",borderRadius:"2em"}}>
           <h6 class="display-6 font-weight-bold text-white">Welcome  to EasyMed Dashboard</h6>
        </ol>
        </nav>
        <p class="lead d-none d-sm-block">EasyMed Dashboard Records</p>
 
        
        <div class="row mb-3 ml-1 mr-1 pt-0 pb-0" style={{justifyContent:"center", gap:"70px"}}>
            
          <Dashboardcard_im bcolor="#A01545" cardtext="Total Users" value={user.length}/>
          <Dashboardcard_im bcolor="#A01545" cardtext="Total Orders" value="2500"/>
          <Dashboardcard_im bcolor="#001233"  cardtext="All Categories" value={maincategory.length}/>
        
            
           
            
        </div>
        <div class="row mb-3 ml-1 mr-1 pt-0 pb-0" style={{justifyContent:"center",gap:"70px" }}>
            
            <Dashboardcard_im bcolor="#860008" cardtext="Out of Stock" value="1"/>
            <Dashboardcard_im bcolor="#660000" cardtext="Low Stock" value="3"/>
            <Dashboardcard_im bcolor="#660000" cardtext="Expired Stock" value="7"/>
          
              
             
              
          </div>
 
        <hr/>
       
       
        <div class="row" style={{justifyContent:"center" }}>
        <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
                <h4 className='title mt-3 mb-3 text-center text-secondary'>User Activity</h4>
              </div>
            
            <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
                <h4 className='title mt-3 mb-3 text-center text-secondary'>Category Changes </h4>
              </div>
        </div>
       
        <a id="more"></a>
        <hr/>

        <div class="row ">
            <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="row" className="head" >
              <h5 class="mt-3 mb-3 text-secondary">
               Recently Logging Users
              </h5>
             <Button colorScheme="blue" size="sm" >view all</Button>
              

              </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th>National ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>User Role</th>
                              
                            </tr>
                        </thead>
                        <tbody>

                        {

user.map((USER)=>{

  return( 
   <tr key={USER.id}>

       <td>{USER.idNo}</td>
       <td>{USER.fullName}</td>
       <td>{USER.age}</td>
       { USER.userRole==true && ( <><td><Button size="xs" colorScheme="green">Active</Button></td></>)
              
                
           }

           { USER.userRole==false && ( <><td><Button size="xs" colorScheme="red">Inactive</Button></td></>)
              
                
           }

   </tr>)

})

  }
                         
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="row" className="head" >
              <h5 class="mt-3 mb-3 text-secondary">
               Recent Added Category List
              </h5>
             <Button colorScheme="blue" size="sm" >view all</Button>
              

              </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th>Category Code</th>
                                <th>Category Name</th>
                                <th>Status</th>
                               
                            </tr>
                        </thead>
                        <tbody>

                            {
                                maincategory.map((cat)=>{
                               
                                    return(
                                    <tr key={cat._id}>

                                        <td>{cat.main_category_code}</td>
                                        <td>{cat.main_category_name}</td>

                                     

                                    { cat.status==true && ( <><td><Button size="xs" colorScheme="green">Active</Button></td></>)
                                       
                                         
                                    }

                                    { cat.status==false && ( <><td><Button size="xs" colorScheme="red">Inactive</Button></td></>)
                                       
                                         
                                    }

                                    </tr>)

                                })
                            }
                      
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
       
        <a id="more"></a>
        <hr/>
        
       
      
        
 
       
       
        
 
        
      
 
        
        
        
 
    </div>
     )
 }
  
 export default InventoryDashboard;