document.addEventListener("DOMContentLoaded", actualizarCarrito);
window.addEventListener("storage", actualizarCarrito);

function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let totalCantidad = carrito.reduce((sum, p) => sum + Number(p.cantidad), 0);
    let totalPrecio = carrito.reduce((sum, p) => sum + (Number(p.precio) * Number(p.cantidad)), 0);
    console.log(carrito)

    carritoDiv.innerHTML = `
    <table class="carrito-tabla">
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Talla</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            ${carrito.map((p, index) => `
                <tr>
                    <td><img src="${p.imagen}" alt="${p.nombre}" class="carrito-img"></td>
                    <td>${p.nombre}</td>
                    <td>${p.talla}</td>
                    <td>${p.cantidad}</td>
                    <td>${formatearPrecioCLP(p.precio * p.cantidad)}</td>
                    <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
                </tr>
            `).join("")}
        </tbody>
    </table>
    <div class="carrito-resumen">
        <p><strong>Total de productos:</strong> ${totalCantidad}</p>
        <p><strong>Total a pagar:</strong> ${formatearPrecioCLP(totalPrecio)}</p>
        <button id="pagar-btn">Pagar</button>
    </div>
    `;

    document.getElementById("pagar-btn").addEventListener("click", function() {
        window.location.href = "pago.html"; 
    });
}

function modificarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    carrito[index].cantidad = Math.max(1, parseInt(carrito[index].cantidad) + cambio);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    actualizarCarrito();
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
