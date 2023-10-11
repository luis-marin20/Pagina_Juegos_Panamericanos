from flask import Flask, request, render_template, redirect, url_for, session
from werkzeug.utils import secure_filename
import db
import os
import hashlib
import filetype
import uuid


app = Flask(__name__)

@app.route('/', methods='GET')
def index():
    return render_template('index.html')

@app.route('/agregar_artesano', methods=['GET', 'POST'])
def agregar_artesano():
    if request.method == 'GET':
        return render_template('agregar_artesano.html')
    elif request.method == 'POST':
        region = request.form['region']
        comuna = request.form['comuna']
        artesania = request.form['artesania']
        descripcion = request.form['descripcion']
        foto1 = request.files['foto1']
        foto2 = request.files['foto2']
        foto3 = request.files['foto3']
        fotos = [foto1, foto2, foto3]
        nombre = request.form['nombre_artesano']
        email = request.form['email_artesano']
        celular = request.form['celular_artesano']

        if validarFormulario(region, comuna, artesania, descripcion, fotos, nombre, email, celular):
            pass
        else:
            pass

def validarFormulario(region, comuna, artesania, descripcion, fotos, nombre, email, celular):
    if validarFotos(fotos) and validarEmail(email) and validarCelular(celular) and validarNombre(nombre) and validarDescripcion(descripcion):
        return True
    else:
        return False

def validarFotos(fotos):
    for foto in fotos:
        extension = filetype.guess(foto).extension
        if extension not in ['jpg', 'jpeg', 'png']:
            return False
    
    return True

def validarEmail(email):
    pass

def validarCelular(celular):
    pass

def validarNombre(nombre):
    pass

def validarDescripcion(descripcion):
    pass

def fotoSegura(foto):
    hash_foto = hashlib.sha256(secure_filename(foto.filename).encode('utf-8')).hexdigest()
    uuid_foto = str(uuid.uuid4())
    extencion = filetype.guess(foto).extension

    new_foto = f"{hash_foto}_{uuid_foto}.{extencion}"

    return new_foto