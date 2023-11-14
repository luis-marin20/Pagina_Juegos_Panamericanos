import hashlib
import filetype
import uuid
import os
from app import app
import re
from werkzeug.utils import secure_filename

def validarFormulario(region, comuna, artesania, descripcion, fotos, nombre, email, celular):
    if validarFotos(fotos) and validarEmail(email) and validarCelular(celular) and validarNombre(nombre) and validarTexto(descripcion) and region is not None and comuna is not None and artesania is not None and len(artesania)>=1 and len(artesania)<=3:
        return True
    else:
        return False
    
def validarTexto(texto):
    codigo_js = r'(?s)<script.*?>(.*?)<\/script>'
    ruta_archivo = r'^(\/[A-Za-z0-9_ -]+(\/[A-Za-z0-9_ -]+)*)|(?:[A-Za-z]:\\(?:[A-Za-z0-9_ -]+\\)*[A-Za-z0-9_ -]+)$'
    coincidencias_js = re.findall(codigo_js, texto)
    coincidencias_ruta = re.findall(ruta_archivo, texto)
    if len(coincidencias_js) > 0 or len(coincidencias_ruta) > 0:
        return False
    else:
        return True
def validarFotos(fotos):
    for foto in fotos:
        if foto.filename is not None and foto.filename != "":
            extension = filetype.guess(foto).extension
            if extension not in ['jpg', 'jpeg', 'png'] or not validarTexto(foto.filename):
                return False
    
    return True

def validarEmail(email):
    email_valido = r'^\S+@\S+\.\S+$'
    if re.match(email_valido, email):
        return True
    else:
        return False

def validarCelular(celular):
    celular_valido = r'^\+569\d{8}$'
    if re.match(celular_valido, celular):
        return True
    else:
        return False

def validarNombre(nombre):
    nombre_valido = r'^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\'-]+ [A-Za-záéíóúÁÉÍÓÚñÑüÜ\'-]+$'
    if re.match(nombre_valido, nombre) and validarTexto(nombre) and len(nombre) <= 80 and len(nombre) >= 3:
        return True
    else:
        return False

def fotoSegura(foto):
    hash_foto = hashlib.sha256(secure_filename(foto.filename).encode('utf-8')).hexdigest()
    uuid_foto = str(uuid.uuid4())
    extencion = filetype.guess(foto).extension

    new_foto = f"{hash_foto}_{uuid_foto}.{extencion}"

    return new_foto

def procesarFoto(foto):
    new_foto = fotoSegura(foto)
    ruta = os.path.join(app.config["UPLOAD_FOLDER"], new_foto) 
    ruta = ruta.replace("\\", "/")
    foto.save(ruta)

    return (ruta, new_foto)

def validarFormularioHincha(deportes, region, comuna, transporte, nombre, email, celular, comentarios):
    return True