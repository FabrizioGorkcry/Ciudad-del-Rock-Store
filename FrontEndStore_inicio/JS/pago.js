document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("carrito")
    let totalCantidad = carrito.reduce((sum, p) => sum + Number(p.cantidad), 0);
    let totalPrecio = carrito.reduce((sum, p) => sum + (Number(p.precio) * Number(p.cantidad)), 0);

    const totalProductos = document.getElementById("total-productos");
    totalProductos.textContent = totalCantidad
    const totalPagar = document.getElementById("total-pago");
    totalPagar.textContent = formatearPrecioCLP(totalPrecio)
    const anioSelect = document.getElementById("anio");
    const anioActual = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
        const option = document.createElement("option");
        option.value = anioActual + i;
        option.textContent = anioActual + i;
        anioSelect.appendChild(option);
    }

    document.getElementById("formulario-pago").addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const tarjeta = document.getElementById("tarjeta").value.replace(/\s/g, '');
        const mes = document.getElementById("mes").value;
        const anio = document.getElementById("anio").value;
        const cvv = document.getElementById("cvv").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        if (nombre === "" || tarjeta.length !== 16 || mes === "" || anio === "" || cvv.length !== 3 || direccion === "") {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        alert("Pago realizado con éxito.");
        localStorage.removeItem("carrito"); 
        window.location.href = "index.html"; 
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
