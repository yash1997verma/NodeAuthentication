const mongoose = require('mongoose');
require('dotenv').config();

module.exports = (async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to DB`)
    }catch(err){
        console.log(`error in connecting to db ${err}`);
    }
})();