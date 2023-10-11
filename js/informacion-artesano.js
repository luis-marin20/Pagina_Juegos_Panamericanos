const urlParams = new URLSearchParams(window.location.search);
const contenidoParam = urlParams.get('contenido');
const contenido = document.getElementById(contenidoParam);
if (contenido) {
    contenido.style.display = "block";
}

function cambiarTamaño(img) {
    img.classList.toggle("ampliadas");
}

//Vemos los hipervinculos
const redirigir = () => {
    window.location.href = "ver-artesanos.html";
}