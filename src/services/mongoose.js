require('dotenv').config();
const mongoose = require('mongoose');

ConnectDb().catch(err => console.log(err));

//requete principale
async function ConnectDb() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
}

module.exports = {
    ConnectDb
}