const isAuthenticated = (req, res, next) =>{
    if(!req.user){
        
        return res.status(401).json('Usuario no autentificado');
    }
    return next();
};
const isAdmin = (req, res, next) =>{
    if(req.user.role === 'usuarioAdminSchema'){
        return next();
    }
    return res.status(403).json('Acceso Prohibido')
}
module.exports = {
    isAuthenticated,
    isAdmin,
};