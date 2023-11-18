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