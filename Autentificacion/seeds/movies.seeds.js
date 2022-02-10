const  mongoose = require('mongoose');
const db = require('../db');
const Movie = require('../models/Movie');

const movies = [
    {
        title: 'The GodFather',
        director:'Francis Ford Copplola',
        year:'1972',
        genre:'Crime, Drama'
    },

    {
        title: 'Titanic',
        director:'James Cameron',
        year:'1997',
        genre:'Romance'
    },
    {
        title: 'Capitan Phillips',
        director:'Paul Greengrass',
        year:'2013',
        genre:'Drama, Thriller'
    },
    {
        title: 'The Holiday',
        director:'Paul Greengrass',
        year:'2006',
        genre:'romance, comedia'
    },
    {
        title: 'Shutter Island',
        director:'Martin Scorsese',
        year:'2010',
        genre:'Thriller, Intriga'
    },
];
const moviesDocuments = movies.map(coche => new Movie(movies));
db.connectDB()
    // Ver si hay coches y eliminarlos
    .then(async () => {
        const todasPelis = await Movie.find();
        if (todasPelis.length > 0) {
            await Movie.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    // Añadir documentos de coches a la base de datos
    .then(async () => {
        await Movie.insertMany(moviesDocuments)
        // await Promise.all(cochesDocuments.map((coche) => Coche.insert(coche)));
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())