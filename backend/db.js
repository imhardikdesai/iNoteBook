const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false";
// if not working in mongodb compass then go to services in your local computer and manually start mongodb services

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connection Successfully');
    })
}

module.exports = connectToMongo;