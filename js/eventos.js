function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES");
}

fetch("http://localhost:8080/api/eventos")
    .then(response => response.json())
    .then(eventos => {
        const contenedor = document.getElementById("contenedor-eventos");
        contenedor.innerHTML = "";
        
        eventos.forEach(evento => {
            contenedor.innerHTML += `
                <div class="card">
                    <h2>${evento.nombre}</h2>
                    <p>${evento.ciudad}</p>
                    <p>${formatearFecha(evento.fecha)}</p>
                    <button onclick="window.location='carreras.html?
                    eventoId=${evento.id}'">Ver Carreras</button>
                </div>
            `;
        });
    })