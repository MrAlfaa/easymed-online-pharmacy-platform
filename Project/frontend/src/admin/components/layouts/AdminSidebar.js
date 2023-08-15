import logo from '../images/easymedlogo.png';
import "./AdminSidebar.css"
import logout from '../images/log_out.png';
import { Link } from "react-router-dom";
import React from 'react'




const AdminSidebar = ({item}) => {
    return (
      <div  class="col-md-3 col-lg-2 sidebar-offcanvas pl-0 pr-0" id="sidebar" role="navigation" style={{backgroundColor:"#4d004d"}}>
      <ul style={{textAlign:"left"}} class="nav flex-column sticky-top pl-0 pt-5 p-0 mt-3 d-block ">

          

      <center>   <li class="nav-item mb-3 mt-3"><a class="nav-link text-white" href="/inventory"><img height="110px" src={logo}/></a></li></center>

        
          {item.map((item) => (

               <li id='item'  class="nav-item mb-2 "><Link to={item.path} class="nav-link"  key={item.id}> <span className="ml-0">{item.name}</span></Link></li>

               
          ))}


   

    <center><li class="nav-item mb-1 mt-5"><a class="nav-link text-white" href="#"><img width='150px' src={logout}/></a></li></center>
 

      </ul>
 </div>
   
    )}

    export default AdminSidebar;