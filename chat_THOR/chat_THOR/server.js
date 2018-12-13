var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var userDAO     = require('./dao/UserDAO').UserDAO;
var messageDAO  = require('./dao/MessagesDAO').MessageDAO;



var mdbconf = {
    host: 'localhost',
    port: '27017',
    db: 'chat_THOR'
};


MongoClient.connect('mongodb://'+mdbconf.host+':'+mdbconf.port+'/'+mdbconf.db, function (err, db) {
  
  var usersDAO = new userDAO(db); 
  var messagesDAO = new messageDAO(db);
  var onlineUsers = [];
  

  app.use(bodyParser()); 
  
  

  
  app.get('/signup', function (req, res) {
    res.sendFile( __dirname + '/views/signup.html');
  });
  
  app.post('/signup', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    
    usersDAO.addUser(username, password, email, function (err, user) {
      if (err) {
        res.send({ 'error': true, 'err': err});
      }
      else {
       
        res.send({ 'error': false, 'user': user });
        
      }
    });
  });

  app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    usersDAO.validateLogin(username, password, function (err, user) {
      if (err) {
        res.send({'error': true, 'err': err});
      }
      else {
        user.password = null;
        res.send({ 'error': false, 'user': user});
          
  
      }
    })
  });
  

  app.get('/css/foundation.min.css', function (req, res) {
    res.sendFile(__dirname + '/views/css/foundation.min.css');
  });

  app.get('/css/normalize.css', function (req, res) {
    res.sendFile(__dirname + '/views/css/normalize.css');
  });
  
  app.get('/css/chat2.css', function (req, res) {
    res.sendFile(__dirname + '/views/css/chat2.css');
  })

  
  app.get('/js/foundation.min.js', function (req, res) {
    res.sendFile(__dirname + '/views/js/foundation.min.js');
  });
  
  app.get('/js/foundation.offcanvas.js', function (req, res) {
    res.sendFile(__dirname + '/views/js/foundation.offcanvas.js');
  });
  
  app.get('/js/chat.js', function (req, res) {
    res.sendFile(__dirname + '/views/js/chat.js');
  });
  
  app.get('/js/moment-with-locales.min.js', function (req, res) {
    res.sendFile(__dirname + '/views/js/moment-with-locales.min.js')
  })
  
  app.get('/img/nathan1.png', function (req, res) {
    res.sendFile(__dirname + '/views/img/nathan1.png');
  })
  
  app.get('/chat', function(req, res) {
    res.sendFile( __dirname + '/views/chat.html');
  });
  app.get('/chat2', function(req, res) {
    res.sendFile( __dirname + '/views/index.html');
  });


  io.on('connection', function(socket) {
    
    console.log('Nuevo  usuario conectado');
   
 

    socket.on('all online users', function () {
      socket.emit('all online users', onlineUsers);
    
    });
    

    socket.on('chat message', function(msg) {
      messagesDAO.addMessage(msg.username, Date.now(), msg.message, function (err, nmsg) {
        io.emit('chat message', msg);
      });
    });
    

    socket.on('disconnect', function() {
      onlineUsers.splice(onlineUsers.indexOf(socket.user), 1);
      io.emit('remove user', socket.user);
      console.log('Usuario desconectado');
    });
    

    socket.on('latest messages', function () {
      messagesDAO.getLatest(50, function (err, messages) {
        if (err) console.log('Error getting messages from history');
        socket.emit('latest messages', messages);
      });
    });
    
    socket.on('new user', function (nuser) {
      socket.user = nuser;
      onlineUsers.push(nuser);
      io.emit('new user', nuser);
    });
    
  });

  http.listen(5000, function() {
    console.log('operando con el puerto :3000');
  });
});



var express = require('express'),
    app = express(),
    
    server = require('http').createServer(app),
    io = require("socket.io").listen(server),
    usuarios = {};

server.listen(3000);
//server.listen(process.env.PORT, process.env.IP);
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/views/botonchat.html');
   
});
app.get('/index2', function(req, res) {
  res.sendfile(__dirname + '/views/index2.html');
   
});
app.get('/administrador', function(req, res) {
    res.sendfile(__dirname + '/views/administrador.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('enviar mensaje', function(data) {
        io.sockets.emit('nuevo mensaje', {msg: data,usuario: socket.usuario});
        
    });
    
    socket.on('nuevo usuario', function(data, callback) {
        if (data in usuarios) {
            callback(false);
        } else {
            callback(true);
            socket.usuario = data;
            usuarios[socket.usuario] = 1;
            actualizarusuarios();
        }
    });
    
    socket.on('disconnect', function(data) {
        if(!socket.usuario) return;
        delete usuarios[socket.usuario];
        actualizarusuarios();
    });
    
    function actualizarusuarios() {
        io.sockets.emit('usuarios', usuarios);
    }
});
