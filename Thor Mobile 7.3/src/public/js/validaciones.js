
function t() {

    let nombre = document.getElementById('nombre').value;
    
    apellido = document.getElementById('apellido').value;
    
    correo = document.getElementById('correo').value;
    
    alias = document.getElementById('alias').value;
    
    fecha = document.getElementById('fecha').value;
    
    documento = document.getElementById('documento').value;
    
    tarjeta = document.getElementById('tarjeta').checked;
    
    
    
  
    
    
    
    
    
    if (nombre != "" && apellido != "" && correo != "" && alias != "" && fecha != "" && documento != ""
    
    && (tarjeta != false || paypal != false || efecty != false)) {
    
    
    
    }
    
    else {
    
    alert("los campos estan vacios")
    
    }
    
    var hoy = new Date();
    
    hoy = hoy.getFullYear();
    
    fecha = new Date(fecha);
    
    var fecha = fecha.getFullYear();
    
    fecha = hoy - fecha;
    
    if (fecha < 18) {
    
    alert("menor de edad")
    
    }
    
    
    
    
    
    if (documento < 48 || documento > 57) {
    
    
    
    }
    
    else {
    
    alert('solo numeros en el campo documento')
    
    }
    
    if (nombre < 48 || nombre > 57) {
    
    alert('solo letras en el campo nombre')
    
    }
    
    if (apellido < 48 || apellido > 57) {
    
    alert('solo letras en el campo apellido')
    
    }
    
    
    
    }
    
    