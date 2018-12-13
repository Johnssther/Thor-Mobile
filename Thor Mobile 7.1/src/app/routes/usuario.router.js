const express = require('express');
const session = require('express-session');
const User = require('../models/Usuario');
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    // req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    const users = await User.find();
    res.json(users);
});

userRouter.post('/signup', (req, res) => {
    console.log('POST /signup');
    console.log(req.body);
    console.log('Guardando en la base de datos');
    // res.sendFile(path.join(__dirname + '../../../views/perfil.html'))

    let usuario = new User()
    usuario.name = req.body.name
    usuario.lastname = req.body.lastname
    usuario.email = req.body.email
    usuario.date = req.body.date
    usuario.nickname = req.body.nickname
    usuario.password = req.body.password

    usuario.save(console.log('Datos registrados'))

});

userRouter.post('/login', async (req, res) => {
    console.log(req.body);
    // console.log(req.body.password);
    const resultado = await User.findOne(
        {
            nickname: req.body.nickname,
            password: req.body.password
        }
    ).countDocuments();
    const name = req.body.nickname;

    console.log(name)

    if (resultado > 0) {
        console.log('Login correcto')
        // req.session.user_id = user._id
        const usuarioLog = await User.findOne(
            {
                nickname: req.body.nickname,
                password: req.body.password
            }
        )
        req.session.user_id = usuarioLog._id;

        console.log(req.session.user_id)
        console.log(req.session)

        //res.sendFile(path.join(__dirname + '../../../views/perfil.html'))
        // res.end({status:"login ok"})
    } else {
        console.log('login incorrecto')


    }

});

module.exports = userRouter;
