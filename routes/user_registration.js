const router=require('express').Router();
const registration=require('../models/registration');
const validator = require('validator');
const passwordHash = require('password-hash');

router.post('/', async (req, res)=>{
    console.log(`${req.body.first_name}`);
    const first_name=req.body.first_name;
    const middle_name=req.body.middle_name;
    const last_name=req.body.last_name;
    const email=req.body.email;
    const password=req.body.password;
    const phone=req.body.phone;
    const user=await registration.find({ email: req.body.email });
    if(user.length>0){
        return res.status(300).send({error:"email already exist"});
    }
    if(!validator.isEmail(email)){
        return res.status(300).send({error:"enter a valid email"});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(300).send({error:"enter a strong password"});
    }
    if(!validator.isInt(phone) || phone.length!=10){
        return res.status(300).send({error:"enter a valid phone number"});
    }
    const hashPassword=passwordHash.generate(password);
    const reg=new registration({
        name: {
            fisrt_name:first_name,
            middle_name:middle_name,
            last_name:last_name
        },
        email:email,
        password:hashPassword,
        phone:phone
    });
    const response=await reg.save();
    console.log(response);
    return res.send(response);
});
module.exports=router;