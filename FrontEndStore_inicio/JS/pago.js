document.addEventListener("DOMContentLoaded", () => {

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
});
