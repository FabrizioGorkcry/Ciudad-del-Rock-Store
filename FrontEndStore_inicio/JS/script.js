document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll(".navegacion__enlace");
    let paginaActual = window.location.pathname.split("/").pop().replace(".html", "");

    if (paginaActual === "") {
        paginaActual = "index"; 
    }

    enlaces.forEach(enlace => {
        if (enlace.dataset.page === paginaActual) {
            enlace.classList.add("navegacion__enlace--activo");
        }
    });
});
