// Connexion con MongoDB
const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://marcvill26:51224260MarcVill@cluster0.vyneb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connectDB };
