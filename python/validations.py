import hashlib
import filetype
import uuid
import os
from app import app
from werkzeug.utils import secure_filename

def validarFormulario(region, comuna, artesania, descripcion, fotos, nombre, email, celular):
    if validarFotos(fotos) and validarEmail(email) and validarCelular(celular) and validarNombre(nombre) and validarDescripcion(descripcion):
        return True
    else:
        return False

def validarFotos(fotos):
    # for foto in fotos:
    #     extension = filetype.guess(foto).extension
    #     if extension not in ['jpg', 'jpeg', 'png']:
    #         return False
    
    return True

def validarEmail(email):
    return True

def validarCelular(celular):
    return True

def validarNombre(nombre):
    return True

def validarDescripcion(descripcion):
    return True

def fotoSegura(foto):
    hash_foto = hashlib.sha256(secure_filename(foto.filename).encode('utf-8')).hexdigest()
    uuid_foto = str(uuid.uuid4())
    extencion = filetype.guess(foto).extension

    new_foto = f"{hash_foto}_{uuid_foto}.{extencion}"

    return new_foto

def procesarFoto(foto):
    new_foto = fotoSegura(foto)
    foto.save(os.path.join(app.config["UPLOAD_FOLDER"], new_foto))
    ruta = os.path.join(app.config["UPLOAD_FOLDER"], new_foto)

    return (ruta, new_foto)