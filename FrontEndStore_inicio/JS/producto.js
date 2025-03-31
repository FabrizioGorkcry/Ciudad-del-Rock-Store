document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("producto-nombre").textContent = params.get("nombre");
    document.getElementById("producto-imagen").src = params.get("imagen");
    document.getElementById("producto-precio").textContent = `$${params.get("precio")}`;

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
            nombre: params.get("nombre"),
            imagen: params.get("imagen"),
            precio: params.get("precio"),
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
});
