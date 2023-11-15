//Vemos la opcion de elegir la comuna en base a la region elegida
// const regionSeleccionada = document.getElementById("region");
// const comunaSeleccionada = document.getElementById("comuna");

// const comunas = {
//             none: ["---"],
//             arica: ["---","Arica", "Camarones", "Putre", "General Lagos"],
//             tarapaca: ["---","Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
//             antofagasta: ["---","Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
//             atacama: ["---","Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
//             coquimbo: ["---","La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
//             valparaiso: ["---","Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
//             metropolitana: ["---","Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
//             ohiggins: ["---","Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
//             maule: ["---","Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
//             nuble: ["---","Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"],
//             biobio: ["---","Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
//             araucania: ["---","Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
//             rios: ["---","Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
//             lagos: ["---","Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
//             aysen: ["---","Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
//             magallanes: ["---","Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
//         };

// function actualizarComunas() {
//     const region = regionSeleccionada.value;
//     comunaSeleccionada.innerHTML = ""; // Limpia las opciones actuales
    
//     comunas[region].forEach(comuna => {
//         const option = document.createElement("option");
//         option.value = comuna;
//         option.textContent = comuna;
//         comunaSeleccionada.appendChild(option);
//     });
// }

// regionSeleccionada.addEventListener("change", actualizarComunas);
// actualizarComunas();

document.getElementById('region').addEventListener('change', function() {
    var regionSeleccionada = this.value;
    obtenerComunas(regionSeleccionada);
});

function obtenerComunas(regionSeleccionada) {
    // Usa Ajax para enviar una solicitud al servidor Flask
    // y obtener las opciones correspondientes al segundo campo
    fetch('/obtener-comunas/' + regionSeleccionada)
        .then(response => response.json())
        .then(opciones => {
            var comuna = document.getElementById('comuna');
            comuna.innerHTML = ''; // Limpia las opciones anteriores
            var vacio = document.createElement('option');
            vacio.text = "---";
            comuna.add(vacio);

            opciones.forEach(function(opcion) {
                var option = document.createElement('option');
                option.text = opcion;
                comuna.add(option);
            });
        });
}

//Vemos los hipervinculos
const redirigir = () => {
    window.location.href = "/";
}

//Comenzamos a ver los validadores de la pagina

//Validador de artesanias
const atresanias = document.getElementById("artesania");
const artesanias = atresanias.selectedOptions;
const errorDeportes = document.getElementById("error-artesanias");

const validadorArtesanias = () => {
    if (artesanias.length == 3) {
        for(let i = 0; i < atresanias.options.length; i++) {
            if(!atresanias.options[i].selected) {
                atresanias.options[i].disabled = true;
            }
        }
        errorDeportes.innerText = "No puedes seleccionar más de 3 artesanias";
    }
    else {
        for(let i = 0; i < atresanias.options.length; i++) {
            atresanias.options[i].disabled = false;
        }
        errorDeportes.innerHTML = "";
    }
}

atresanias.addEventListener("change", validadorArtesanias);

//Validador de fotos
const foto1 = document.getElementById("foto1");
const foto2 = document.getElementById("foto2");
const foto3 = document.getElementById("foto3");

const validadorFotos = () => {
    if (foto2.files.length > 0) {
        foto3.style.display = "block";
        error=document.getElementById("error-fotos");
        error.innerText = "No puedes seleccionar más de 3 fotos";
    }
    else if (foto1.files.length > 0) {
        foto2.style.display = "block";
    }
}

foto1.addEventListener("change", validadorFotos);
foto2.addEventListener("change", validadorFotos);

//Validamos que las cajas de texto cumplan con su largo respectivo
const nombre = document.getElementById("nombre-artesano");
const errorNombre = document.getElementById("error-nombre");

const email = document.getElementById("email-artesano");
const errorEmail = document.getElementById("error-email");

const celular = document.getElementById("celular-artesano");
const errorCelular = document.getElementById("error-celular");

const validadorLargoNombre = () => {
    if (nombre.value.length == 81) {
        nombre.value = nombre.value.slice(0, 80);
        errorNombre.innerText = "No puedes ingresar más de 80 caracteres";
    }
    else {
        errorNombre.innerHTML = "";
    }
}

const validadorLargoEmail = () => {
    if (email.value.length == 31) {
        email.value = email.value.slice(0, 30);
        errorEmail.innerText = "No puedes ingresar más de 30 caracteres";
    }
    else {
        errorEmail.innerHTML = "";
    }
}

const validadorLargoCelular = () => {
    if (celular.value.length == 16) {
        celular.value = celular.value.slice(0, 15);
        errorCelular.innerText = "No puedes ingresar más de 15 caracteres";
    }
    else {
        errorCelular.innerHTML = "";
    }
}

nombre.addEventListener("input", validadorLargoNombre);
email.addEventListener("input", validadorLargoEmail);
celular.addEventListener("input", validadorLargoCelular);

//Validamos cada casilla al enviar el formulario
const regionForm = document.getElementById("region");
const comunaForm = document.getElementById("comuna");
const artesaniaForm = document.getElementById("artesania");

const errorRegion = document.getElementById("error-region");
const errorComuna = document.getElementById("error-comuna");
const errorArtesania = document.getElementById("error-artesanias");
const errorFoto = document.getElementById("error-fotos");

const validadorFormulario = () => {
    let correcto = 1;
    if(regionForm.value == "none") {
        errorRegion.innerText = "Debes seleccionar una región";
        correcto = 0;
    }
    else {
        errorRegion.innerHTML = "";
    }
    if(comunaForm.value == "---") {
        errorComuna.innerText = "Debes seleccionar una comuna";
        correcto = 0;
    }
    else {
        errorComuna.innerHTML = "";
    }
    if(artesaniaForm.value.length == 0) {
        errorArtesania.innerText = "Debes seleccionar al menos una artesanía";
        correcto = 0;
    }
    else {
        errorArtesania.innerHTML = "";
    }
    if(foto1.files.length == 0) {
        errorFoto.innerText = "Debes seleccionar al menos una foto";
        correcto = 0;
    }
    else {
        errorFoto.innerHTML = "";
    }
    const nombreChek= /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\'-]+ [A-Za-záéíóúÁÉÍÓÚñÑüÜ\'-]+$/;
    if(!nombreChek.test(nombre.value)) {
        errorNombre.innerText = "Debes ingresar tu nombre en formato Nombre Apellido";
        correcto = 0;
    }
    else if(nombre.value.length < 3) {
        errorNombre.innerText = "Debes ingresar al menos 3 caracteres";
        correcto = 0;
    }
    else {
        errorNombre.innerHTML = "";
    }
    const emailChek= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailChek.test(email.value)) {
        errorEmail.innerText = "Debes ingresar un correo válido";
        correcto = 0;
    }
    else {
        errorEmail.innerHTML = "";
    }
    const celularChek= /^\+569\d{8}$/;
    if(!celularChek.test(celular.value)) {
        errorCelular.innerText = "Debes ingresar un número de celular válido";
        correcto = 0;
    }
    else {
        errorCelular.innerHTML = "";
    }

    if(correcto == 0) {
        return false;
    }
    else {
        mostrarModal();
        return false;
    }
}

// Get the modal
const mostrarModal = () => {
    const modal = document.getElementById("modal");
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    const cancelar = document.getElementById("cerrar-modal");
    
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    cancelar.onclick = function() {
        modal.style.display = "none";
    }
}

const cerrarModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

const enviarFormulario = () => {
    cerrarModal();
    const formulario = document.getElementById("artesano");
    formulario.submit();
}

const registrarArtesano = document.getElementById("registrar-artesano");
registrarArtesano.addEventListener("click", validadorFormulario);