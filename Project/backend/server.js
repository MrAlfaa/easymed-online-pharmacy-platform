const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");




const app = express();
require("dotenv").config();  

const PORT = process.env.PORT || 8070;
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());  


const URL = process.env.MONGODB_URL;


mongoose.connect(URL, {

    useNewUrlParser: true

})



const connection = mongoose.connection;
connection.once("open", () => {     

    console.log("Mongodb Connection success!!");

});




const mainCategoryRouter=require("./routes/main_category_r_im.js");
app.use("/maincategory",mainCategoryRouter)

const userRouter=require("./routes/user_r_im.js");
app.use("/user",userRouter)






app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
})