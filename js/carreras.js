function renombreModalidad(modalidad){
  if (modalidad === "DIEZ_K") return "10K";
    if (modalidad === "MEDIA_MARATON") return "Media Maratón";
    if (modalidad === "MARATON") return "Maratón";
}



const params = new URLSearchParams(window.location.search);
const eventoId = params.get("eventoId");
console.log(eventoId);
fetch(`http://localhost:8080/api/eventos/${eventoId}/carreras`)
.then(response => response.json())
.then(carreras => {
    const contenedor = document.getElementById("contenedor-carreras");
        contenedor.innerHTML = "";
    carreras.forEach(carrera => {
        contenedor.innerHTML+=`
        <div class="card">
        <h2>${renombreModalidad(carrera.modalidad)}</h2>
        
        <button>Ver detalles</button>
        </div>
   
        `;
    })
})