const express=require("express");
const app=express();
const dbConnection=require("./db");
const cors=require('cors');

dbConnection();

app.use(express.json());
const PORT=process.env.PORT || 3000;
//cors
// const corsOptions={
//     origin: process.env.ALLOWED_CLIENTS.split(",")
// }
app.use(cors());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  }));
app.use('/api/file/upload', require('./routes/file'));
app.use('/api/user/registration', require('./routes/user_registration'));
app.use('/api/user/login', require('./routes/login'));
app.use('/api/file/seacrh', require('./routes/find'));

//starting the server
app.listen(PORT, ()=>{
    console.log(`server running on this ${PORT} port`);
});