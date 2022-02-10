const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('../Autentificacion/auth/passport');
const auth = require('../Autentificacion/middlewares/auth.middelware');
const usuariosRouter = require('../Autentificacion/router/usuarios.router');
const moviesRouter = require('../Autentificacion/router/movies.router');
const db = require('../Autentificacion/db');
const PORT = process.env.PORT || 3000;

const server = express();
//añadimos milddlewares para leer los body
server.use(express.json());
server.use(express.urlencoded({ extended: false})); //se usan librerias querystring y qs
//Añadir milddlewares de passport en express
server.use(session({
    secret: 'secreto-desarrollo',
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge:3600000,//tiempo de validez
    },
    store: MongoStore.create({mongoUrl: db.DB_URL})
}));
server.use(passport.initialize());
server.use(passport.session());//para añadir la session

server.get('/', (req, res) => {
    res.status(200).send('Server is up & Running');
});

server.use('/movies', [auth.isAuthenticated], moviesRouter);
server.use('/usuarios', usuariosRouter);


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