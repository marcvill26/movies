const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesShema = new Schema({
    title: { type: String, required:true},
    director: { type: String,required:true},
    year: {type: Number},
    genre: { type: String, required:true},
},{
    timestamps: true
});

const Movie = mongoose.model('Movie', moviesShema);
module.exports = Movie;