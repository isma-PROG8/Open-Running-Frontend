function renombreModalidad(modalidad){
  if (modalidad === "DIEZ_K") return "10K";
    if (modalidad === "MEDIA_MARATON") return "Media Maratón";
    if (modalidad === "MARATON") return "Maratón";
}


console.log("carrera detalle js cargado");
const params = new URLSearchParams(window.location.search);
const carreraId = params.get("carreraId");
console.log(carreraId);
fetch(`http://localhost:8080/api/carreras/${carreraId}`)
.then(response => response.json())
.then(carrera => {
    const contenedor = document.getElementById("detalles-carrera");
    contenedor.innerHTML = `
    <ul class="frase-carrera">
    <li>El running no es solo un deporte, es una filosofía de vida que te enseña que con esfuerzo y constancia todo es posible</li>
    <li>Cuando tus piernas quieran parar y tu mente te diga que ya es suficiente, recuerda por qué empezaste</li>
    <li>No importa lo lento que vayas, siempre irás más rápido que el que se quedó en el sofá</li>

    </ul>
        <div class="card">
            <h2>${renombreModalidad(carrera.modalidad)}</h2>
            <p>Plazas disponibles: ${carrera.plazasMax}</p>
            <button id="btn-inscribirse">Inscribirse</button>
        </div>
    `;
    document.getElementById("btn-inscribirse").onclick = function() {
    document.getElementById("formulario-inscripcion").style.display = "flex";
}
})
document.getElementById("btn-confirmar").onclick = function() {
    const nombre = document.getElementById("nombre").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    console.log("Enviando:", nombre, dni, telefono, correo, carreraId);

    fetch("http://localhost:8080/api/inscripcion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
  
        body: JSON.stringify({
            corredor: {
                nombre: nombre,
                dni: dni,
                telefono: telefono,
                correo: correo
            },
            carrera: {
                id: parseInt(carreraId)
            }
        })
    })
    .then(response => {
    alert("¡Inscripción realizada correctamente!");
})
document.getElementById("nombre").value = "";
document.getElementById("dni").value = "";
document.getElementById("telefono").value = "";
document.getElementById("correo").value = "";
}