const express = require("express"); 
const router = express.Router();  
const fs = require('fs');

router.get("/expenses",(req,res)=>{
   fs.readFile("expense.json","utf-8",(err,data)=>{
    if(err) { 
        res.status(500).json({ 
           message:"cannot get the data", 
           err:err
        })
        }     
    const expenses=JSON.parse(data);   

    res.status(200).json({
        data:expenses
    })

   })
}) 

router.post("/addexpense",(req,res)=>{ 
    if(!req.body){
        res.status(400).json({
            message:"invalid input"
        })
    }
    const {title,amount} = req.body;  
    if(!title || !amount){
        res.status(401).json({
            message:"invalid input"
        })
    }
    const newExpense = {
        id:Math.floor(Math.random()*100), 
        title:title, 
        amount:amount, 
        date:new Date().toISOString().split("T")[0]
    }   
    let expenses;
    fs.readFile("expense.json","utf-8",(err,data)=>{
        if(err){
            res.status(500).json({
                err:err
            })
        } 
      expenses=JSON.parse(data); 
      console.log("printing: ",expenses);  
          expenses.push(newExpense);
    fs.writeFile("expense.json",JSON.stringify(expenses,null,2),(err)=>{
        if(err){
            res.status(500).json({
                message:"cant add expense", 
                err:err
            })
        }  

        res.status(200).json({
            message:"expense addes successfully"
        })

    })
    }) 


})

module.exports=router;