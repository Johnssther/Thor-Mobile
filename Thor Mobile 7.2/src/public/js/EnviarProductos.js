//Remover
/*
localStorage.removeItem("InfoProducto_1");
localStorage.removeItem("InfoProducto_2");
localStorage.removeItem("InfoProducto_3"); 
*/

let botonProducto4 = document.getElementById("Boton_Producto_4");
let botonProducto5 = document.getElementById("Boton_Producto_5");
let botonProducto6 = document.getElementById("Boton_Producto_6");
let botonProducto7 = document.getElementById("Boton_Producto_7");
let botonProducto8 = document.getElementById("Boton_Producto_8");
let botonProducto9 = document.getElementById("Boton_Producto_9");
let botonProducto10 = document.getElementById("Boton_Producto_10");
let botonProducto11 = document.getElementById("Boton_Producto_11");


function agregarAlCarrito(numProducto){

   let nombreProducto = document.getElementById("Nombre_Producto_" + numProducto).innerHTML;
   let precioProducto = document.getElementById("Precio_Producto_" + numProducto).value;
   let imagenProducto = document.getElementById("Imagen_Producto_" + numProducto);
   let direccionImagenP = imagenProducto.getAttribute("src");


   let nombreArreglo = "InfoProducto_" + numProducto;
	let datosProducto =
	{
		"nombre": nombreProducto,
		"precio": precioProducto,
		"imagen": direccionImagenP

	}
	localStorage.setItem(nombreArreglo, JSON.stringify(datosProducto));
}

botonProducto4.addEventListener("click", function(){agregarAlCarrito(4)});
botonProducto5.addEventListener("click", function(){agregarAlCarrito(5)});
botonProducto6.addEventListener("click", function(){agregarAlCarrito(6)});
botonProducto7.addEventListener("click", function(){agregarAlCarrito(7)});
botonProducto8.addEventListener("click", function(){agregarAlCarrito(8)});
botonProducto9.addEventListener("click", function(){agregarAlCarrito(9)});
botonProducto10.addEventListener("click", function(){agregarAlCarrito(10)});
botonProducto11.addEventListener("click", function(){agregarAlCarrito(11)});
