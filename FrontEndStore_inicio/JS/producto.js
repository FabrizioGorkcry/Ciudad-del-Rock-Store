document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const idParamUrl = params.get("id")
    const productoSelected = dataProducto.find(item => item.id == idParamUrl);

    document.getElementById("producto-banda").textContent = productoSelected.banda;
    document.getElementById("producto-imagen").src = productoSelected.imagen;
    document.getElementById("producto-precio").textContent = formatearPrecioCLP(productoSelected.precio);
    document.getElementById("producto-diseno").textContent = productoSelected.diseño;
    document.getElementById("producto-descripcion").textContent = productoSelected.descripcion;

    document.getElementById("agregar-carrito").addEventListener("click", () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const talla = document.getElementById("talla").value;
        const cantidad = parseInt(document.getElementById("cantidad").value);

        if (!talla) {
            alert("Por favor, selecciona una talla.");
            return;
        }

        if (cantidad <= 0 || isNaN(cantidad)) {
            alert("La cantidad debe ser un número válido.");
            return;
        }

        const producto = {
            nombre: productoSelected.banda,
            imagen: productoSelected.imagen,
            precio: productoSelected.precio,
            talla,
            cantidad
        };

        const index = carrito.findIndex(item => item.nombre === producto.nombre && item.talla === producto.talla);

        if (index !== -1) {
            carrito[index].cantidad += cantidad;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito.");
    }); 

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
    
});
