function renombreModalidad(modalidad){
  if (modalidad === "DIEZ_K") return "10K";
    if (modalidad === "MEDIA_MARATON") return "Media Maratón";
    if (modalidad === "MARATON") return "Maratón";
}


function ocultarSecciones() {
    document.getElementById("crear-evento").style.display = "none";
    document.getElementById("ver-eventos").style.display = "none";
    document.getElementById("ver-inscripciones").style.display = "none";
}

document.getElementById("btn-crear-evento").onclick = function() {
    ocultarSecciones();
document.getElementById("crear-evento").style.display="block";}    
document.getElementById("btn-guardar-evento").onclick = function() {
    const nombre = document.getElementById("nombre-evento").value;
    const fecha = document.getElementById("fecha-evento").value;
    const ciudad = document.getElementById("ciudad-evento").value;
    const plazasMax = document.getElementById("plazas-max").value;
    console.log("Enviando:", nombre, fecha, ciudad);
    const carreras = [];

if (document.getElementById("diez-k").checked) {
    carreras.push({ modalidad: "DIEZ_K", plazasMax: parseInt(plazasMax), plazasOcupadas: 0 });
}
if (document.getElementById("media-maraton").checked) {
    carreras.push({ modalidad: "MEDIA_MARATON", plazasMax: parseInt(plazasMax), plazasOcupadas: 0 });
}
if (document.getElementById("maraton").checked) {
    carreras.push({ modalidad: "MARATON", plazasMax: parseInt(plazasMax), plazasOcupadas: 0 });
}

    fetch("http://localhost:8080/api/eventos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
  
        body: JSON.stringify({
            
                nombre: nombre,
                fecha: fecha,
                ciudad: ciudad,
                activo:true,
                carreras: carreras
            
        })
    })
        .then(response => {
    alert("¡Evento creado correctamente!");
})
document.getElementById("nombre-evento").value = "";
document.getElementById("fecha-evento").value = "";
document.getElementById("ciudad-evento").value = "";
document.getElementById("plazas-max").value = "";
                
            }
            document.getElementById("btn-ver-eventos").onclick = function() {
                ocultarSecciones();
    document.getElementById("ver-eventos").style.display = "block";
    
    fetch("http://localhost:8080/api/eventos")
        .then(response => response.json())
        .then(eventos => {
            const contenedor = document.getElementById("ver-eventos");
            contenedor.innerHTML = "<h2>Ver Eventos</h2>";
            eventos.forEach(evento => {
                contenedor.innerHTML += `
                    <div class="card">
                        <h2>${evento.nombre}</h2>
                        <p>${evento.ciudad}</p>
                        <button onclick="eliminarEvento(${evento.id})">Eliminar</button>
                    </div>
                `;
            });
        })
}
function eliminarEvento(id) {
    console.log("Eliminando evento con id:", id);
    fetch(`http://localhost:8080/api/eventos/${id}`, {
    method: "DELETE"
})
 .then(() => {
        alert("Evento eliminado correctamente!");
        location.reload();
    })
} 
document.getElementById("btn-ver-inscripciones").onclick = function() {
    ocultarSecciones();
    document.getElementById("ver-inscripciones").style.display = "block";
    
    fetch("http://localhost:8080/api/eventos")
        .then(response => response.json())
        .then(eventos => {
            const selector = document.getElementById("selector-evento");
            selector.innerHTML = "<option value=''>Selecciona un evento</option>";
            eventos.forEach(evento => {
                selector.innerHTML += `<option value="${evento.id}">${evento.nombre}</option>`;
            });
        })
}
document.getElementById("selector-evento").onchange = function() {
    const eventoId = this.value;
    if (!eventoId) return;
    
    fetch(`http://localhost:8080/api/eventos/${eventoId}/inscripciones`)
        .then(response => response.json())
       .then(inscripciones => {
    const lista = document.getElementById("lista-inscripciones");
    let html = `
        <table>
            <tr>
                <th>Nombre</th>
                <th>Dorsal</th>
                <th>Carrera</th>
            </tr>
    `;
    inscripciones.forEach(inscripcion => {
        html += `
            <tr>
                <td>${inscripcion.corredor.nombre}</td>
                <td>${inscripcion.dorsal}</td>
                <td>${renombreModalidad(inscripcion.carrera.modalidad)}</td>
            </tr>
        `;
    });
    html += `</table>`;
    lista.innerHTML = html;
})
}