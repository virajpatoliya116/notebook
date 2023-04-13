// const mongoose = require('mongoose');

const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://bhoomildayani182:@cluster0.pvcmcei.mongodb.net/test";

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connect to mongo successfully");
    })
}

module.exports = connectToMongo;