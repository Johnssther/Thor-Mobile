const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
        name: String,
        lastname: String,
        email: String,
        date: Date,
        nickname: String,
        password: String

});
userSchema.pre('save', (next) => {
        const usuario = this;
        bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                        next(err);
                }
                bcrypt.hash(usuario.password, salt, null, (err, hash) => {
                        if (err) {
                                next(err);
                        }
                        usuario.password=hash;
                        next();
                })
        }
        )
})
module.exports = mongoose.model('User', userSchema);



