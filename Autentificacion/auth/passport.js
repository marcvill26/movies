const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const bcrypt = require('bcrypt');//encryptamos password
const SALTOS_ENCRIPTADO = 10;


passport.use('register',
//Creo el registro de un usuario
    new LocalStrategy(
        {
            usernameField: 'correo',
            passwordField: 'contrasena',
            passReqToCallback: true,
        },
            async (req, username, password, done) => {
            try{
            //1 buscar si el usuario existe en la DB para
            const usuarioExistente = await Usuario.findOne ({correo: username})
            //2 si el usuario existe salimos con un error 
            if (usuarioExistente){
                const error = new Error('Usuario Ya registrado');
                return done(error);
            }
            //3 Encriptar la contraseña
            //.hash hace los saltos de encriptado
            const passwordEncriptada = await bcrypt.hash(password, SALTOS_ENCRIPTADO);
            //4 crear el documento del usuario para guardarlo en DB
            const nuevoUsuario = new Usuario({correo:username, contrasena: password});
            const usuarioGuardado = await nuevoUsuario.save();

            // eliminar contraseña para que no sea visible
            usuarioGuardado.contrasena = undefined;
            //5 retornar OK/KO
            done(null, usuarioGuardado);
        }catch (error){
            return done(error);
        }
    }
    )

)
passport.use('login', 
    new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'contrasena',
        passReqTocallback: true,
    },
    async (req, username, password, done) => {
        try{
            //1busco el usuario por el correo/nombre de usuario...
            const usuario = await usuario.findOne({correo: username});

            //2 si el usuario no existe fallamos.. 
            if (!usuario){
                const error = new Error('Usuario no registrado');
                return done(error);
            }
            //3 comparar contraseñas
            const esValidaContrasena = await  bcrypt.compare(password, usuario.contrasena);
            //4 validar contraseñas
            if (!esValidaContrasena){
                const error = new Error ('Contraseña Incorrecta')// recomendado no poner que ha fallado 
                return done(error);
            }
            //5 damos por valido el login..
            usuario.contrasena = undefined;
            return done(null, usuario);

        }catch (error){
            return done(error);
        }
    }
    
    
    )

)

//login User Admin


passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser(async (userId, done) =>{
    try{
        const usuario = await usuario.findOne(userId);
        done(null, usuario);
    } catch(error){
        return done(error);
    }
});