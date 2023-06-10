const router=require('express').Router();
const registration=require('../models/registration');

router.get('/', async (req, res)=>{
    try{
        const {email, password} = req.query;
        console.log(`get request for ${email} and ${password}`);
        const user=await registration.find({
            $and: [
              { email: email },     // Condition 1: age >= 18
              { password: password }       // Condition 2: city = 'New York'
            ]
          });
          console.log(user.length);  
        if(user.length==0){
            return res.send({message:false});
        }
        return res.send({message:user});  
    }catch(err){
        console.log(err);
        return res.send({error:err});
    }
});
module.exports=router;