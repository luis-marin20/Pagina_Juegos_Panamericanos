from flask import Flask, request, render_template, redirect, url_for, session, abort
import python.db as db
import os
import python.validations as val

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/ver-hinchas", methods=["GET"])
def ver_hinchas():
    return render_template("ver-hinchas.html")

@app.route("/agregar-hincha", methods=["GET"])
def agregar_hincha():
    return render_template("agregar-hincha.html")

@app.route("/informacion-hinchas/<name>", methods=["GET"])
def informacion_hinchas(name):
    hinchas = {"juan": ["Juan Perez","Futbol, Natacion, Voleibol playa", "Metropolitana", "Cerro Navia", "Particular", "juan.perez@gmail.com", "+56987654321"],
               "luis": ["Luis Marin", "Tenis, Tenis de mesa, Futbol", "Metropolitana", "Til Til", "Transporte publico", "luis.marin@gmail.com", "+56982184672"],
               "anita": ["Anita la Huerfanita", "Clavados, Gimnasia ritmica, Atletismo", "Metropolitana", "La Florida", "Transporte publico", "ani.huerfana@artesanias.class", "+56998765432"],
               "bryan": ["Bryan Silva", "Polo acuatico, Futbol, Tenis", "Metropolitana", "Colina", "Transporte publico", "bryn.silva@outlook.com", "+56912345678"],
               "armando": ["Armando Casas", "Balonmano", "Metropolitana", "Puente Alto", "Particular", "armando.casas@contacto.cl", "+56987654321"]}
    nombre = hinchas[name][0]
    deportes = hinchas[name][1]
    region = hinchas[name][2]
    comuna = hinchas[name][3]
    transporte = hinchas[name][4]
    email = hinchas[name][5]
    celular = hinchas[name][6]
    return render_template("informacion-hincha.html", nombre_id=name, nombre=nombre, deportes=deportes, region=region, comuna=comuna, transporte=transporte, email=email, celular=celular)

@app.route("/agregar-artesano", methods=["GET", "POST"])
def agregar_artesano():
    if request.method == "GET":
        return render_template("agregar-artesano.html")
    elif request.method == "POST":
        region = request.form["region"]
        comuna = request.form["comuna"]
        artesania = request.form.getlist("artesania")
        descripcion = request.form["descripcion"]
        foto1 = request.files["foto1"]
        foto2 = request.files["foto2"]
        foto3 = request.files["foto3"]
        fotos = [foto1, foto2, foto3]
        nombre = request.form["nombre"]
        email = request.form["email"]
        celular = request.form["celular"]

        if val.validarFormulario(region, comuna, artesania, descripcion, fotos, nombre, email, celular):
            db.agregar_artesano(db.obtener_id_comuna(comuna), descripcion, nombre, email, celular)

            for art in artesania:
                db.agregar_artesano_tipo(db.obtener_id_artesano(nombre),db.obtener_id_artesania(art))
            
            for foto in fotos:
                if foto.filename is not None and foto.filename != "":
                    ruta, new_foto = val.procesarFoto(foto)
                    db.agregar_foto(ruta, new_foto, db.obtener_id_artesano(nombre))

            return redirect(url_for("index"))
        else:
            abort(400, "Debes completar todos los campos correctamente.")

@app.route("/ver-artesanos", methods=["GET"])
def ver_artesanos():
    art=[[nombre, celular, comuna, artesano_id] for nombre, celular, comuna, artesano_id in db.listado_artesanos_foto()]
    artesanos = []
    for artesano in art:
        artesania = db.obtener_tipo_artesania(artesano[3])
        print(artesania)
        artesania = ', '.join([''.join(map(str, tupla)) for tupla in artesania])
        fotos = db.obtener_foto(artesano[3])
        artesanos.append([artesano[0], artesano[1], artesano[2], artesania, fotos, artesano[3]])
    elementos_por_pagina = 5
    pagina = request.args.get('pagina', 1, type=int)

    inicio = (pagina - 1) * elementos_por_pagina
    fin = inicio + elementos_por_pagina

    elementos_pagina = artesanos[inicio:fin]

    total_paginas = (len(artesanos)+elementos_por_pagina-1)//elementos_por_pagina

    return render_template("ver-artesanos.html", elementos=elementos_pagina, num_paginas=total_paginas, pagina_actual=pagina)

@app.route("/informacion-artesanos/<artesano_id>", methods=["GET"])
def informacion_artesanos(artesano_id):
    informacion = db.info_artesano(artesano_id)
    artesania = db.obtener_tipo_artesania(artesano_id)
    artesania = ', '.join([''.join(map(str, tupla)) for tupla in artesania])
    fotos = db.obtener_foto(artesano_id)
    return render_template("informacion-artesano.html", nombre_id=artesano_id, nombre=informacion[0], region=informacion[1], comuna=informacion[2], artesania=artesania, foto=fotos, email=informacion[3], celular=informacion[4])

if __name__ == "__main__":
    app.run(debug=True)