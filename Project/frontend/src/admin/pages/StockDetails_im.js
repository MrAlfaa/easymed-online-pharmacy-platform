import "./StockDetails_im.css";
import axios from 'axios';
import { api } from "../../config";
import {toast} from 'react-hot-toast';
import { useState,useEffect } from "react";
import {DeleteIcon, EditIcon, ViewIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';
import moment from 'moment'

import {Modal} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';







function StockDetails_im(){

    const params = useParams();
    const [stockitem,setStockitem]=useState([]);
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const [stock_location,setStocklocation]=useState("");
    const [date,setDate]=useState("");
    const [quantity,setQuantity]=useState(null);
    const [expired_date,setExpireddate]=useState("");
    const [product_code,setProductcode]=useState(params.id);
    const [stock_id,setStockid]=useState("");
    const [stock,setStock]=useState(0);



    //setState(moment(your date here).format('YYYY-MM-DD'))


    const navigate = useNavigate();
   
    const handleClose = () => {setShow(false);}
  const handleShow = () => setShow(true);
  const handleClose1 = () => {setShow1(false);}
  const handleShow1 = () => setShow1(true);



    useEffect(() => {

           
        const getproduct =async()=>{

            const result=await axios.get(`${api}/product/get_one_product_code/${params.id}`);
            const item=result.data;
            let i=item[0].stock;
            setStock(i);
            setProduct(result.data);

         
    
        }




      

      

       
        getproduct();
        getstock();

      
       


    }, [])

    const getonestock =async(_id)=>{

      const result=await axios.get(`${api}/stock/get_one_stock/${_id}`);
      const item=result.data;
      console.log(item);
      setDate( moment(item.date).format('YYYY-MM-DD'));
      setStocklocation(item.stock_location);
      setQuantity(item.quantity);
      setExpireddate(moment(item.expired_date).format('YYYY-MM-DD'));
     
     

  }

    const getstock =async()=>{

        const result=await axios.get(`${api}/stock/get_product_stock/${params.id}`);

        setStockitem(result.data);

        console.log(result.data);
        
        const item=result.data;

        let stock=0;

        for(let i=0;i<item.length;i++){

          stock=stock+(item[i].quantity);




        }

        
        


        
     
        
        
        
       
        const pro={

            stock

        }

        axios.put(`${api}/product/update_product_code/${params.id}`,pro).then(()=>{

          
  
       }).catch((err)=>{
  
       
        console.log(err);})
        

        

        
    

    }

   

   

    function sendStockData(e){
        e.preventDefault();

        const Stock={


            date,
            stock_location,
            quantity,
            expired_date,
            product_code
            

        }

      
       if(stock_id===""){

        axios.post(`${api}/stock/add_stock`,Stock).then(()=>{

               
          setDate("");
          setStocklocation("");
          setQuantity("");
          setExpireddate("");
          toast.success('new stock  is successfully Added!!');
          getstock();
          setTimeout(() => {
          handleClose();
          
       }, 1000);
     }).catch((err)=>{
 
       toast.error("This stock cant be Added");
       console.log(err);
 
     })

       }
       else{

        axios.put(`${api}/stock/update_stock/${stock_id}`,Stock).then(()=>{

               
          setDate("");
          setStocklocation("");
          setQuantity("");
          setExpireddate("");
          setStockid("");
          toast.success('stock  is successfully Updated!!');
          getstock();
          setTimeout(() => {
          handleClose1();
          
       }, 1000);
       setStockid("");
     }).catch((err)=>{
 
       toast.error("This stock cant be Updated");
       console.log(err);
 
     })

         

       }

          
       


        
    }


    const handleUpdate=(_id)=>{
      setStockid(_id);
      
      getonestock(_id);

      handleShow1();
     

  }

   

       
      
      
      
  


    

   





    return(<>
    
    <div class="col main pt-5 mt-3">

    
         
       
            
<div  className="head">
    <div>
<h5 class="display-6 font-weight-bold text-black">Product Stock-(Product Code-{params.id})</h5></div>

</div>



<hr/>


<div class="card text-center" style={{marginLeft:"150px",marginRight:"150px"}}>
  <div class="card-header">
 <b>Product-Details</b> 
  </div>
  <div class="card-body  "> 

  <table class="table " style={{width:"100%"}}>
  
  

  <tbody>
    <tr>
      
      <td style={{backgroundColor:"#0B1145",color:"white",fontWeight:"bold",border:"white solid 5px"}}>Product Code</td>
      <td style={{backgroundColor:"#0B1145",color:"white",fontWeight:"bold",border:"white solid 5px"}}>Product Name</td>
      <td style={{backgroundColor:"#0B1145",color:"white",fontWeight:"bold",border:"white solid 5px"}}>Unit Type</td>
      <td style={{backgroundColor:"#0B1145",color:"white",fontWeight:"bold",border:"white solid 5px"}}>Total Stock</td>

    
    </tr>
    {
        product.map((item)=>{

          

          return(
            <tr>
            <td>{item.product_code}</td>
            <td>{item.product_name}</td>
            <td>{item.unit_type}</td>
            <td>{item.stock}</td></tr>)
        })
    }
  </tbody>
</table>

    
  
 </div>
 </div>

 <div class="card text-center mt-5 mb-5" style={{marginLeft:"150px",marginRight:"150px"}}>
  <div class="card-header">
 <b>Stock-Details</b> 
  </div>
  
  <div  className="head" style={{backgroundColor:"white",border:"none"}}>
                <div>
          </div>
            <div><button onClick={handleShow} type="button" class="btn btn-primary">Add New Stock</button></div>
            </div>
       
  <div class="card-body  "> 

  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Stock Location</th>
      <th scope="col">Quantity</th>
      <th scope="col">Expired Date</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    {
        stockitem.length>0 && stockitem.map((sitem)=>{
             
          
            return(

                <tr key={sitem._id}>
                    <td>{sitem.date}</td>
                    <td>{sitem.stock_location}</td>
                    <td>{sitem.quantity}</td>
                    <td>{sitem.expired_date}</td>
                    <td><div className="actionitem"><EditIcon  onClick={()=>handleUpdate(sitem._id)} color="blue.500" boxSize={5}/></div></td>

                </tr>
            )

        })
    }
  </tbody>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>   {stock_id=="" ? "Add New Stock":"Edit Stock"}(Product Code-{params.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
               value={date}
               onChange={(event)=>setDate(moment(event.target.value).format('YYYY-MM-DD'))}
                type="Date"
                placeholder=""  

                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock Location</Form.Label>
              <Form.Control
                 value={stock_location}
                 onChange={(event)=>setStocklocation(event.target.value)}
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                 value={quantity}
                 onChange={(event)=>setQuantity(event.target.value)}
                type="number"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expired Date(if is it available?)</Form.Label>
              <Form.Control
               value={expired_date}
               onChange={(event)=>setExpireddate(moment(event.target.value).format('YYYY-MM-DD'))}
                type="date" 
                placeholder=""
                autoFocus
              />
            </Form.Group>

            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={sendStockData} >
         Submit
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>   Edit Stock(Product Code-{params.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
               value={date}
               onChange={(event)=>setDate(moment(event.target.value).format('YYYY-MM-DD'))}
                type="Date"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock Location</Form.Label>
              <Form.Control
                 value={stock_location}
                 onChange={(event)=>setStocklocation(event.target.value)}
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                 value={quantity}
                 onChange={(event)=>setQuantity(event.target.value)}
                type="number"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expired Date(if is it available?)</Form.Label>
              <Form.Control
               value={expired_date}
               onChange={(event)=>setExpireddate(moment(event.target.value).format('YYYY-MM-DD'))}
                type="date"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={sendStockData} >
        Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
 </div>
 </div>



</div>

    
    
    </>)

}

export default StockDetails_im;