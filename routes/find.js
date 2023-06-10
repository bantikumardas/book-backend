const router=require('express').Router();
const book=require('../models/book');
const path = require("path");

router.get('/',async (req , res)=>{
    try{
        var {nameTag, catagoryTag}=req.query;
        if(nameTag==undefined){
            nameTag="";
        }
        console.log(`${nameTag} ${catagoryTag}`);
        const queryString=`${nameTag}`;
        if(catagoryTag==undefined || catagoryTag=="all"){
            const books=await book.find({  $text: { $search: queryString } });
            return res.send(books);
        }
        const books=await book.find({ $and: [
            { catagory: catagoryTag },     
            { $text: { $search: queryString }} 
          ] });
        return res.send(books);
    }catch(err){
        console.log(err);
        res.status(300).send({error:err});
    }
});

module.exports=router;