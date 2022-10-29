const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connection Successfully');
    })
}

module.exports = connectToMongo;