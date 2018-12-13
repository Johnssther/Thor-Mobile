var bcrypt = require('bcrypt-nodejs');

function UserDAO(db) {
    if (false == (this instanceof UserDAO)){
        console.log('ADVERTENCIA: el constructor UserDAO se llama sin "nuevo" operador');
        return new UserDAO(db);
    }
    
    var users = db.collection('users');

    this.addUser = function (username, password, email, callback) {
        users.findOne({'_id': username}, function(err, user){
            if (err) throw err;

            if (user){
                var usuario_ya_existe_error = new Error('Usuario ya existente');
                usuario_ya_existe_error.msg = "Usuario ya existente"
                return callback(usuario_ya_existe_error, null);
            }
            else{
                var salt = bcrypt.genSaltSync();
                var password_hash = bcrypt.hashSync(password, salt);

                var user = {'_id': username, 'password': password_hash, 'email': email};

                users.insert(user, function (err, result){
                    if (err) return callback(err, null);

                    console.log('Nuevo usuario creado');
                    return callback(null, result[0]);
                });
        }
    });
}

this.validateLogin = function (username, password, callback){

    users.findOne({'_id': username}, function(err, user){
        if (err) return callback (err, null);

        if (user){
            if (bcrypt.compareSync(password, user.password)){
                callback(null,user);
            }
            else{
                var invalid_password_error = new Error('Contraseña invalida');
                invalid_password_error.msg = 'Contraseña invalida';
                callback(invalid_password_error, null);
            }
        }
        else{
            var no_such_user_error = new Error('Usuario no encontrado');
            no_such_user_error.msg = 'Usuario no encontrado';
            callback(no_such_user_error, null);
        }
    });
}

}

module.exports.UserDAO = UserDAO;