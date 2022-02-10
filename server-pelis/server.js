const express = require('express');

const moviesRouter = require('../server-pelis/router/movies.router');
const db = require('../server-pelis/db');
const PORT = process.env.PORT || 3000;

const server = express();
//añadimos milddlewares para leer los body
server.use(express.json());
server.use(express.urlencoded({ extended: false})); //se usan librerias querystring y qs

server.get('/', (req, res) => {
    res.status(200).send('Server is up & Running');
});

server.use('/movies', moviesRouter);


server.use('*', (req, res, next) => {
    const error = new Error ('Ruta no encontrada');
    error.status= 404;
    return next(error);
});

server.use((err, _req, res, _next) => {
    return res 
    .status(err.status || 500)
    .json(err.message || 'Error inesperado en servidor');
});

db.connectDB().then(() => {
    console.log('Conectado a base de datos Mongo');
    server.listen(PORT, () => {
        console.log (`Iniciado servidor en puerto ${PORT}`);
    });
});