const express=require("express");
const app=express();
const dbConnection=require("./db");
const cors=require('cors');
const path = require("path");
dbConnection();

app.use(express.json());
const PORT=process.env.PORT || 3000;
const corsOptions={
  origin: process.env.ALLOWED_CLIENTS.split(",")
}
app.use(cors());
app.options('*', cors());


app.set('view engine', 'ejs');  
app.use(express.static('uploads'));
app.use('/api/file/upload', require('./routes/file'));
app.use('/api/user/registration', require('./routes/user_registration'));
app.use('/api/user/login', require('./routes/login'));
app.use('/api/file/seacrh', require('./routes/find'));
app.use('/reads', require('./routes/show'));
app.use('/api/user/contribution', require('./routes/userContribution'));
//starting the server
app.listen(PORT, ()=>{
    console.log(`server running on this ${PORT} port`);
});