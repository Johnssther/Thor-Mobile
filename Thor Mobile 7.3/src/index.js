const express = require('express'),
    app = express(),
    path = require('path'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    { url } = require('./config/database'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    router = require('./app/routes/rutas'),
    colors = require('colors'),
    MongoStore = require('connect-mongo')(session)
const usuarioRouter = require('./app/routes/usuario.router');


//configuracion:
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true });
console.log('Conectando a MongoDb...'.bgGreen);
console.log('Conectado a MongoDb...'.bgYellow);
mongoose.connection.on('error', (err) => {
    throw err;
    process.exit(1);
});


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view-engine','ejs');


app.use(session({
    secret: 'thormobile',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: url,
        autoReconnect: true
    })
}));

//middlewares:
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());

//routers
app.use('/api/usuarios/', usuarioRouter);
app.use('/', router);
app.use('/form_login.html', router);
app.use('/formulario.html', router);
app.use('/carrito.html', router);
app.use('/03Planes.html', router);
app.use('/Catalogo.html', router);


//archivos estaticos:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + 'views')));


//Iniciar servidor
app.listen(app.get('port'), () => {
    //console.log('Conectado a ', app.get('port'));
    console.log('Conectado al puerto 3000'.yellow);
});