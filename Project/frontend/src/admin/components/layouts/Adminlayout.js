
import { AdminNavbar } from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function Adminlayout({children,item,name}){


   
return(
    <div>
    <AdminNavbar name={name} />
    <div class="container-fluid" id="main">
     <div class="row row-offcanvas row-offcanvas-left">
       <AdminSidebar item={item} />
       {children}
       
     
    
 </div>
</div>  
</div>  


);
  
}

export default Adminlayout;