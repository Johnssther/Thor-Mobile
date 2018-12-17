function MostrarElementos(){
	
	let contenedorTotal = document.getElementById("ContenedorTotal");
    
   	storage = localStorage.length;
       
    	if (storage > 0){
    
          for (let i = 1; i < storage + 10; i ++){
    
  
        		let idProducto = "InfoProducto_" + i;
        		let producto = localStorage.getItem(idProducto);
        
        			  if(producto != null){
        	

        					let datosProducto = JSON.parse(producto);
						let datoNombreProducto = datosProducto.nombre;
						let datoPrecioProducto = datosProducto.precio;
						let direccionImg = datosProducto.imagen;
					
						//
							
						let verNombreProducto = document.createTextNode(datoNombreProducto);
						let verPrecioProducto = document.createTextNode(datoPrecioProducto);
				
						let contenedorSuperior = document.getElementsByClassName("container")[0];
						let seccionProducto = document.createElement("div");
            				seccionProducto.className = "seccionp";
            				idCajaProducto = "producto_" +  i;
                			seccionProducto.setAttribute("id", idCajaProducto);
            				
   
						//seccionProducto.className = "total"; 
					
						//caja imagen
            				let caja3 = document.createElement("div");
            				caja3.className = "box box3";
				
            				let imagenProducto = document.createElement("img");
            				imagenProducto.setAttribute("src", direccionImg);
            				imagenProducto.className="imagenProducto";
						caja3.appendChild(imagenProducto);
							
						//caja descripcion
				
						let caja4 = document.createElement("div");
						caja4.className = "box box4";
							
						caja4.appendChild(verNombreProducto);
				
						//caja cantidad
				
            				let caja5 = document.createElement("div");
            				caja5.className = "box box5";
						
						
						let inputCantidad = document.createElement("input");
						inputCantidad.setAttribute("id", "cantidadProducto_" + i);
						inputCantidad.setAttribute("type", "number");
						inputCantidad.setAttribute("min", "1");
						inputCantidad.setAttribute("max", "10");
						inputCantidad.setAttribute("class", "cantidad");
            				
       					caja5.appendChild(inputCantidad);
				
						//caja precio
				
            				let caja6 = document.createElement("div");
            				caja6.className = "box box6";
            				let strongPrecio = document.createElement("strong");
            				strongPrecio.appendChild(verPrecioProducto);
						strongPrecio.setAttribute("id", "PrecioProducto_" + i);	
						
						caja6.appendChild(strongPrecio);
												
						//caja total
				
            				let caja7 = document.createElement("div");
            				caja7.className = "box box7";

            				                
						//Eliminar 
				
            				let caja8 = document.createElement("div");
            				caja8.className = "box box8";
					
						let botonComprar = document.createElement("input");
						botonComprar.setAttribute("type", "button");
						botonComprar.setAttribute("id","BotonEliminar_" + i);
						botonComprar.setAttribute("value", "Eliminar"),
						caja8.appendChild(botonComprar);
						
						
						/*
            				let textoe = document.createTextNode("Eliminar")
            				textoe.className ="box box8";
            				caja8.appendChild(textoe);
						*/
				
						//Cesta Eliminar
				
           				let caja8a = document.createElement("div");
           				caja8a.className = "box box8a";
				
           				let eliminariProducto = document.createElement("div");
           				eliminariProducto.setAttribute("src", "../img/cesta1.png");
           				eliminariProducto.className ="div";
           				caja8a.appendChild(eliminariProducto);
				
						//Linea divisora productos
				
           				let cajaLinea = document.createElement("div");
           				cajaLinea.className = "box lineah";
				
           				/* let lineaH = document.createElement("div");
           				lineaH.setAttribute("src", "../img/cesta1.png");
           				lineaH.className ="div";
           				cajaLinea.appendChild(lineaH); */
        				
			
				
						//agregar a seccion producto
				
						seccionProducto.appendChild(caja3);
						seccionProducto.appendChild(caja4);
						seccionProducto.appendChild(caja5);
						seccionProducto.appendChild(caja6);
            				seccionProducto.appendChild(caja7);
            				seccionProducto.appendChild(caja8);
            				seccionProducto.appendChild(caja8a);
            				seccionProducto.appendChild(cajaLinea);
				
            				//agregar a la caja principal
        				
						contenedorSuperior.appendChild(seccionProducto);
		   } 
        }
    }
}


function total(){
    
   	let storage = localStorage.length;
   	let suma = 0;
   	
    	if (storage > 0){
          for (let i = 1; i < storage + 10; i ++){ 
          	let valor = document.getElementById("PrecioProducto_" + i);
          	if (valor != null){
   				valor = valor.innerHTML;
          		valor = parseInt(valor);
          		suma = suma + valor;
          	}
		}
		
	}else{
		alert("No hay productos");
	}
	
	alert("El total de la compra es: " + suma);
}




/*
function precioxcantidad(){

	let storage = localStorage.length;
   	let suma = 0;
   	
    	if (storage > 0){
          for (let i = 1; i < storage + 10; i ++){ 
          	
          		let cantidad = document.getElementById("cantidadProducto_" + i);
          		let valor = document.getElementById("PrecioProducto_" + i);

          		if(cantidad != null && valor != null){
          		
          			valor = valor.innerHTML;
          			valor = parseInt(valor);
          			cantidad = cantidad.value;
          			
          			alert(cantidad, valor);	
          	}
          }
     }
}

*/


function eliminar(numProducto){

		let eliminarProducto = document.getElementById("producto_" + numProducto);
		let contenedorSuperior = document.getElementsByClassName("container")[0];
		contenedorSuperior.removeChild(eliminarProducto);	
		
		localStorage.removeItem("InfoProducto_" + numProducto);	
}

function listarBotonesEliminar(){

   	storage = localStorage.length;
       
    	if (storage > 0){
   
          for (let i = 1; i < storage + 10; i ++){
          
          	let boton = document.getElementById("BotonEliminar_" + i);
          	
          	if (boton != null){
          		boton.addEventListener("click", function(){eliminar(i)});
          	}
          }
      }
}

function obtenerCookie(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function comprobarCookie(clave) {
    var clave = obtenerCookie(clave);
    if (clave!="") {
        return("no existe")
    }else{
        return("existe")
    }
}

function validarSesion(){
	console.log(comprobarCookie("connect.sid"));
}

let botonComprar = document.getElementById("BotonComprar");
botonComprar.addEventListener("click",  validarSesion);
	
MostrarElementos();
listarBotonesEliminar();

