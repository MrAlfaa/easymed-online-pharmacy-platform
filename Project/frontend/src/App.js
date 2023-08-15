import './App.css';
import Adminlayout from "./admin/components/layouts/Adminlayout";
import InventoryDashboard from "./admin/pages/InventoryDashboard";
import {InventoryData} from "./admin/data";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react'
import UserList_im from './admin/pages/UserList_im';
import UserAdd_im from './admin/pages/UserAdd_im';
import UserStock_im from './admin/pages/UserStock_im';
import StockDetails_im from './admin/pages/StockDetails_im';









function App() {
  return (

   <div>
    
    
    
     
    
      
      
     
   
    
   
    <ChakraProvider>
   <BrowserRouter>
   
   
   <Routes> 
    {/* customer side routes */}
   

    
    
   
      


    {/* admin side routes */}
    <Route path="/inventory" element={<Adminlayout item={InventoryData} name="Admin Panel"><InventoryDashboard/></Adminlayout>}/>
    <Route path="/inventory/p_list" element={<Adminlayout item={InventoryData} name="Admin Panel"><UserList_im/></Adminlayout>}/>
    <Route path="/inventory/add_product" element={<Adminlayout item={InventoryData} name="Admin Panel"><UserAdd_im/></Adminlayout>}/>
    <Route path="/inventory/add_product/:id" element={<Adminlayout item={InventoryData} name="Admin Panel"><UserAdd_im/></Adminlayout>}/>
    <Route path="/inventory/product_stock" element={<Adminlayout item={InventoryData} name="Admin Panel"><UserStock_im/></Adminlayout>}/>
    <Route path="/inventory/product_stock/stock_details/:id" element={<Adminlayout item={InventoryData} name="Admin Panel"><StockDetails_im/></Adminlayout>}/>
    <Route path="/inventory/product_stock/stock_details/:id/:idd" element={<Adminlayout item={InventoryData} name="Admin Panel"><StockDetails_im/></Adminlayout>}/>
    
    
   </Routes>
   
   
   </BrowserRouter>
   
   <Toaster position="bottom-center"
        reverseOrder={false} />
        
        </ChakraProvider>
   
   
   </div>

  );
}

export default App;
