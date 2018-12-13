var user = {};

$(document).foundation();
$(document).ready(function () {
  $('#login-modal').foundation('reveal', 'open');
});


function login() {
  $.ajax({
    type: "POST",
    url: '/login',
    data: $('#login-form').serialize(),
    success: function (data) {
      $('#alerts').empty();
      if (data.error) {
        var html = '<div data-alert class="alert-box alert round">'
                   + data.err.msg + '</div>';
        $('#alerts').append(html);
      }
      else {
        user = data.user;
        var socket = new io();
        configureSocket(socket);
        $('#btn-login').css('display', 'none');
        $('#login-modal').foundation('reveal', 'close');
      }
    },
    dataType: 'json'
  });
}


function appendMessage(msg) {
  var humanDate = moment(new Date(msg.date)).calendar();
  var html = '<div class="small-11 message">' +
                '<blockquote>' +
                  '<span class="message-title">' + msg.username +
                  ':</span>' +
                  '<cite class="right message-date show-for-medium-up">' + humanDate + '</cite>' +
                  '<div class="message-body">' +
                  msg.message +
                  '</div>' +
                '</blockquote>' +
              '</div>';
             
  var listmsgs = $('#list-msgs');
  listmsgs.append( html );
  
  var sh = listmsgs[0].scrollHeight;
  listmsgs.scrollTop(sh);
}


function configureSocket(socket) {
  
  socket.on('all online users', function (users) {
    console.log(users.length + ' users received');
    for (var i=0; i<users.length; i++) 
    {
      var userhtml = '<div class="' + users[i]._id + 
                '" online-user">' + 
                '<img src="img/nathan.png" class="user-image">' +
                '<strong>&nbsp;&nbsp;' + users[i]._id + '</strong>'+
                '</div>';
      $('.online-userslist').append(userhtml);
    }
  });
  

  socket.on('chat message', function (msg) {
    appendMessage(msg);
  });
  

  socket.on('latest messages', function (messages) {
    for (var i = messages.length - 1; i >= 0; i--) {
      appendMessage(messages[i]);
    };
  })
  

  socket.on('new user', function (nuser) {
    if(nuser._id == 'JULIAN ROJAS'){
      var img = 'img/nathan.png';
    }
    else{
      var img = 'img/nathan1.png'
    }
    var userhtml ='<div class="online-user ' + nuser._id +'">' + 
                  '<img src="'+img+'" class="user-image">' +
                  '<strong>&nbsp;&nbsp;' + nuser._id + '</strong>'+
                  '</div>';
                
    $('.online-userslist').append(userhtml);
  });

  socket.on('remove user', function (nuser) {
    $('#' + nuser._id).remove();
  });
  

  $('#new-msg').keyup(function (evt) {
    if (evt.keyCode === 13) {
      var nmsg = {
        username : user._id,
        message : $('#new-msg').val()
      }
      socket.emit('chat message', nmsg);
      $('#new-msg').val('');
    }
  });
  

  socket.emit('all online users');

  socket.emit('latest messages');
  
  socket.emit('new user', user);
  
}

var modal = document.getElementById('myModal');
    
    // Get the button that opens the modal
    var btn = document.getElementById("chat");
    
    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
var modal = document.getElementById('myModal');
    
    // Get the button that opens the modal
    var btn = document.getElementById("chat");
    
    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }