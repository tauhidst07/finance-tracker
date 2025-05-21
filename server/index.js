
const { randomInt } = require("crypto");
const express = require("express"); 
require("dotenv").config();  
const port = parseInt(process.env.PORT) || 3000;
const app = express();  

const expenseRoutes=require("./routes/expense");

app.use(express.json()); 

app.use("/expense",expenseRoutes);

app.get("/",(req,res)=>{
    res.send("server is running..");
})    




app.listen(port,()=>{
    console.log("server started successfully on port",port); 
   
});