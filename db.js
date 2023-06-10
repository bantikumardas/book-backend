const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = () => {
    mongoose.connect( process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, 
        useUnifiedTopology: true}).then(() => {
        console.log('databse connected');
    }).catch((err) => {
        console.log('database connection unsuccessful');
        console.log(err);
    });
}


module.exports = dbConnection;