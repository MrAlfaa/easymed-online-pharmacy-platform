import { Button } from "@chakra-ui/react";
import "./UserList_im.css";
import { useState,useEffect } from "react";
import {DeleteIcon, EditIcon, ViewIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import { api } from "../../config";
import {toast} from 'react-hot-toast';
import {
    Table,
    Thead,
    Tbody,
   
    Tr,
    Th,
    Td,
   
    TableContainer,
   
} from '@chakra-ui/react'

function UserList_im(){

    const [items, setItems] = useState([]);
    const [deleteId,seteDeleteId]=useState("");
    const [show,setShow]=useState(false);

    useEffect(() => {
           
           

      
        

        getuser();
       


    }, [])

    const getuser =async()=>{

        const result=await axios.get(`${api}/user/get_user`);
        setItems(result.data);
        console.log(result.data);

    }

    const handleDeleteUser=async()=>{

        await axios.delete(`${api}/user/delete_user/${deleteId}`).then((res)=>{
 
         console.log(res);
         
         setShow(false)
         getuser();
         toast.success('Successfully Deleted!')
        })
 
 
     }
  


    const handleClose=()=>{
        setShow(false)
    }

    const handledelete=(_id)=>{
        seteDeleteId(_id)
        setShow(true)
        console.log(_id);

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

   


    

    return(<>
     <div class="col main pt-5 mt-3">

    
         
       
            
            <div  className="head">
                <div>
            <h5 class="display-6 font-weight-bold text-black">User List</h5></div>
            <div><Button colorScheme="blue"  variant='outline'>Add New User</Button></div>
            </div>
       
         <div className="search">
         

         <div class="input-group rounded">
  <input type="search" class="form-control rounded" onChange={handleSearch} placeholder="Search Users" aria-label="Search" aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
</div>
  

         </div>
  
         <hr/>

         < div className="utable">

         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure Delete This User</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteUser}>
           OK
          </Button>
          <Button colorScheme="red" onClick={handleClose}>
        Cancel
          </Button>
        </Modal.Footer>
      </Modal>

         <TableContainer overflowY='auto' maxHeight='70vh'>
                <Table variant='striped' colorScheme='gray'>

                    <Thead  backgroundColor="white" position="sticky" top={0} zIndex="docked">
                        <Tr textAlign="center" >
                            <Th fontSize="medium" textAlign="center" ><b>ID Card No</b></Th>
                            <Th fontSize="medium" textAlign="center"><b>Name</b></Th>
                            <Th fontSize="medium" textAlign="center"><b>ID Image</b></Th>
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
               <Td textAlign="center"><center><img src={`${api}${item.id_img_1_url}`} alt="no" height="50px" width="50px"/></center> </Td>
                <Td textAlign="center">{item.age}</Td>

                
                { item.userRole===true && ( <><Td textAlign="center"><Button size="xs" colorScheme="green">Active</Button></Td></>)
                                       
                                         
                                    }

                                    { item.userRole===false && ( <><Td textAlign="center"><Button size="xs" colorScheme="red">Inactive</Button></Td></>)
                                       
                                         
                                    }

               
                <Td textAlign="center"><div className="actionitem"><ViewIcon boxSize={5}/><Link to={`/inventory/add_product/${item._id}`}><EditIcon color="blue.500" boxSize={5}/></Link>
                <DeleteIcon onClick={()=>handledelete(item._id)} color="red.500" boxSize={5}/></div></Td>
                
                </Tr>



            ))}

                 

                       
                       

                    </Tbody>

                </Table>


            </TableContainer>



         </div>
        
        
 </div>
    
    
    
    
    </>)

}

export default UserList_im;