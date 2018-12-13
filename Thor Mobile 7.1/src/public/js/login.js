function traerNickname() {
    const nickname = document.getElementById('nickname').value;
    localStorage.setItem('nombre', nickname);
};

function cerrar() {
    alert('Bienvenido a Thor Mobile ' + localStorage.getItem('nombre'));
    window.close();
}

