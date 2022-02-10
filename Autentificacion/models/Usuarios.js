const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    correo: { type: string, required:true},
    contrasena: { type: string, required:true},
},
{ timestamps:true});

const usuarioAdminSchema = new Schema({
    correo:{type: string, required:true},
    contrasena:{type: string, required:true},
},{timestamps:true});

const Usuario = mongoose.model('Usuario', usuarioSchema, usuarioAdminSchema);
module.exports = Usuario;