// Vemos que aparezcan las comunas correspondientes a la region seleccionada usando Ajax
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

//Validador de deportes
const deprotes = document.getElementById("deportes");
const deportes = deprotes.selectedOptions;
const errorDeportes = document.getElementById("error-deportes");

const validadorDeportes = () => {
    if (deportes.length == 3) {
        for(let i = 0; i < deprotes.options.length; i++) {
            if(!deprotes.options[i].selected) {
                deprotes.options[i].disabled = true;
            }
        }
        errorDeportes.innerText = "No puedes seleccionar más de 3 deportes";
    }
    else {
        for(let i = 0; i < deprotes.options.length; i++) {
            deprotes.options[i].disabled = false;
        }
        errorDeportes.innerHTML = "";
    }
}

deprotes.addEventListener("change", validadorDeportes);

//Validamos que las cajas de texto cumplan con su largo respectivo
const nombre = document.getElementById("nombre");
const errorNombre = document.getElementById("error-nombre");

const email = document.getElementById("email");
const errorEmail = document.getElementById("error-email");

const celular = document.getElementById("celular");
const errorCelular = document.getElementById("error-celular");

const comentario = document.getElementById("comentarios");
const errorComentario = document.getElementById("error-comentarios");

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

const validadorLargoComentario = () => {
    if (comentario.value.length == 81) {
        comentario.value = comentario.value.slice(0, 80);
        errorComentario.innerText = "No puedes ingresar más de 80 caracteres";
    }
    else {
        errorComentario.innerHTML = "";
    }
}

nombre.addEventListener("input", validadorLargoNombre);
email.addEventListener("input", validadorLargoEmail);
celular.addEventListener("input", validadorLargoCelular);
comentario.addEventListener("input", validadorLargoComentario);



//Validamos cada casilla al enviar el formulario
const deporteForm = document.getElementById("deportes");
const regionForm = document.getElementById("region");
const comunaForm = document.getElementById("comuna");
const transporteForm = document.getElementById("transporte");

const errorDeporte = document.getElementById("error-deportes");
const errorRegion = document.getElementById("error-region");
const errorComuna = document.getElementById("error-comuna");
const errorTransporte = document.getElementById("error-transporte");

const validadorFormulario = () => {
    let correcto = 1;
    if(deporteForm.selectedOptions.length == 0) {
        errorDeporte.innerText = "Debes seleccionar al menos un deporte";
        correcto = 0;
    }
    else {
        errorDeporte.innerHTML = "";
    }
    if(regionForm.value == "none") {
        errorRegion.innerText = "Debes seleccionar una región";
        correcto = 0;
    }
    else {
        errorRegion.innerHTML = "";
    }
    if(comunaForm.value == "vacio") {
        errorComuna.innerText = "Debes seleccionar una comuna";
        correcto = 0;
    }
    else {
        errorComuna.innerHTML = "";
    }
    if(transporteForm.value == "none") {
        errorTransporte.innerText = "Debes seleccionar un medio de transporte";
        correcto = 0;
    }
    else {
        errorTransporte.innerHTML = "";
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

// const mostrarModal = () => {
//     const modal = document.getElementById("modal");
//     modal.style.display = "block";
// }


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
    const formulario = document.getElementById("hinchas");
    formulario.submit();
}

const registrarHincha = document.getElementById("registrar-hincha");
registrarHincha.addEventListener("click", validadorFormulario);

const cerrarModalBtn = document.getElementById("cerrar-modal");
cerrarModalBtn.addEventListener("click", cerrarModal);