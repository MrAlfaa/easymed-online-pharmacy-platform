import { Button } from "@chakra-ui/react";
import "./UserList_im.css";
import { useState,useEffect } from "react";
//import {DeleteIcon, EditIcon, ViewIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
//import {Modal} from 'react-bootstrap';
import axios from 'axios';
import { api } from "../../config";
import {saveAs} from 'file-saver';

import {
    Table,
    Thead,
    Tbody,
   
    Tr,
    Th,
    Td,
   
    TableContainer,
   
} from '@chakra-ui/react'

function UserStock_im(){

    const [items, setItems] = useState([]);
    
    useEffect(() => {
           
           

      
        

        getuser();
       


    }, [])

    const getuser =async()=>{

        const result=await axios.get(`${api}/user/get_user`);
        setItems(result.data);
        console.log(result.data);

    }

    
  
   const handleSearch=async(event)=>{

         let key=event.target.value;
         if(key){
            const result=await axios.get(`${api}/user/search_user_im/${key}`);
            setItems(result.data);
         }
         else{
            getuser()
         }


    }

   
    const genaratepdf=async()=>{

        await  axios.post(`${api}/userreport/createPdf`,items).then((respnse)=>{
             console.log(respnse)
             axios.get(`${api}/userreport/fetchPdf`,{responseType:'blob'}).then((res)=>{
  
             const pdfBlob=new Blob([res.data],{type:'application/pdf'})
  
             saveAs(pdfBlob,'inventorystock.pdf')
  
             })
        })
      }

    

    return(<>
     <div class="col main pt-5 mt-3">

    
         
       
            
            <div  className="head">
                <div>
            <h5 class="display-6 font-weight-bold text-black">User Details</h5></div>
            <div><Button colorScheme="blue" onClick={genaratepdf} variant='outline'>Export Report</Button></div>

            </div>
       
         <div className="search">
         

         <div class="input-group rounded">
  <input type="search" class="form-control rounded" onChange={handleSearch} placeholder="Search User" aria-label="Search" aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
</div>
  

         </div>
  
         <hr/>

         < div className="utable">

    

         <TableContainer overflowY='auto' maxHeight='70vh'>
                <Table variant='striped' colorScheme='gray'>

                    <Thead  backgroundColor="white" position="sticky" top={0} zIndex="docked">
                        <Tr textAlign="center" >
                            <Th fontSize="medium" textAlign="center" ><b>Id Card No</b></Th>
                            <Th fontSize="medium" textAlign="center"><b>Name</b></Th>
                            <Th fontSize="medium" textAlign="center"><b>Age</b></Th>
                            <Th fontSize="medium" textAlign="center"><b>User Role</b></Th>
                           <Th fontSize="medium" textAlign="center"><b>Action</b></Th>
                        </Tr>
                    </Thead>
                    <Tbody>


                    {
                    
                 items.length >0  &&   items.map((item) => (
                

                   
                <Tr textAlign="center" key={item.id}>
                <Td textAlign="center">{item.idNo}</Td> 
                <Td textAlign="center" >{item.fullName}</Td>
               <Td textAlign="center"> {item.age} </Td>
                <Td textAlign="center">{item.userRole}</Td>
                <Td textAlign="center"><div ><center><Link to={`#${item.idNo}`}><button  class="btn btn-info btn-sm">Export To Pdf</button></Link></center></div></Td>
                
                </Tr>



            ))}

                 

                       
                       

                    </Tbody>

                </Table>


            </TableContainer>



         </div>
        
        
 </div>
    
    
    
    
    </>)

}

export default UserStock_im;