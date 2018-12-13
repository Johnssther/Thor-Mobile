//Remover

localStorage.removeItem("InfoProducto_1");
localStorage.removeItem("InfoProducto_2");
localStorage.removeItem("InfoProducto_3"); 

let botonProducto1 = document.getElementById("Boton_Producto_1");
let botonProducto2 = document.getElementById("Boton_Producto_2");
let botonProducto3 = document.getElementById("Boton_Producto_3");


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

botonProducto1.addEventListener("click", function(){agregarAlCarrito(1)});
botonProducto2.addEventListener("click", function(){agregarAlCarrito(2)});
botonProducto3.addEventListener("click", function(){agregarAlCarrito(3)});
