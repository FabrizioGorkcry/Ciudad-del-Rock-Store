document.addEventListener("DOMContentLoaded", () => {
  
    console.log(dataProducto);
    
    const containerProducts = document.querySelector(".container-products");

    console.log(containerProducts)

    /* containerProducts.innerHTML = `<a href="producto.html?nombre=Polera%20Rock&imagen=img/1.jpg&precio=14990" class="producto">
    <img src="img/1.jpg" alt="AC/DC"/>
    <h1 class="producto__banda">AC/DC</h1>
    <h2 class="producto__diseño">Hells Bells</h2>
    <h3 class="producto__descripcion">Polera corte regular</h3>
    <p class="producto__precio">$14.990</p>
</a>` */

function formatearPrecioCLP(precioInt) {
    // Verificar si el precio es un número entero válido
    if (!Number.isInteger(precioInt)) {
      return "Precio inválido";
    }
  
    // Utilizar Intl.NumberFormat para formatear a moneda chilena
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0, // Opcional: Mínimo de dígitos decimales
      maximumFractionDigits: 0, // Opcional: Máximo de dígitos decimales
    });
  
    return formatter.format(precioInt);
}

const prueba = dataProducto.map(producto => { 
    return `<a href="producto.html?id=${producto.id}" class="producto">
    <img src="${producto.imagen}" alt="${producto.nombre}"/>
    <h1 class="producto__banda">${producto.banda}</h1>
    <h2 class="producto__diseño">${producto.diseño}</h2>
    <h3 class="producto__descripcion">${producto.descripcion}</h3>
    <p class="producto__precio">${formatearPrecioCLP(producto.precio)}</p>
    </a>`
});

containerProducts.innerHTML = prueba.join("")
});

