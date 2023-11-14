from flask import Flask, request, render_template, redirect, url_for, session, abort, jsonify
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
    hin=[[nombre, region, comuna, transporte, email, celular] for nombre, region, comuna, transporte, email, celular in db.informacion_hinchas()]
    hinchas = []
    for hincha in hin:
        deporte = db.obtener_deportes(db.obtener_id_hincha(hincha[0]))
        deporte = ', '.join([''.join(map(str, tupla)) for tupla in deporte])
        hinchas.append([hincha[0], hincha[2], deporte, hincha[3], hincha[5]])
    elementos_por_pagina = 5
    pagina = request.args.get('pagina', 1, type=int)

    inicio = (pagina - 1) * elementos_por_pagina
    fin = inicio + elementos_por_pagina

    elementos_pagina = hinchas[inicio:fin]

    total_paginas = (len(hinchas)+elementos_por_pagina-1)//elementos_por_pagina

    return render_template("ver-hinchas.html", elementos=elementos_pagina, num_paginas=total_paginas, pagina_actual=pagina)

@app.route("/agregar-hincha", methods=["GET", "POST"])
def agregar_hincha():
    if request.method == "GET":
        deportes = db.listar_deportes()
        regiones = db.listar_regiones()
        return render_template("agregar-hincha.html", deportes=deportes, regiones=regiones)
    elif request.method == "POST":
        deportes = request.form.getlist("deportes")
        region = request.form["region"]
        comuna = request.form["comuna"]
        transporte = request.form["transporte"]
        nombre = request.form["nombre"]
        email = request.form["email"]
        celular = request.form["celular"]
        comentarios = request.form["comentarios"]

        if val.validarFormularioHincha(deportes, region, comuna, transporte, nombre, email, celular, comentarios):
            db.agregar_hincha(db.obtener_id_comuna(comuna), transporte, nombre, email, celular, comentarios)

            for dep in deportes:
                db.agregar_hincha_deporte(db.obtener_id_hincha(nombre),db.obtener_id_deporte(dep))

            return redirect(url_for("index"))
        else:
            abort(400, "Debes completar todos los campos correctamente.")

@app.route("/informacion-hinchas/<name>", methods=["GET"])
def informacion_hinchas(name):
    informacion = db.info_hincha(db.obtener_id_hincha(name))
    deporte = db.obtener_deportes(db.obtener_id_hincha(name))
    deporte = ', '.join([''.join(map(str, tupla)) for tupla in deporte])
    return render_template("informacion-hincha.html", nombre=informacion[0], region=informacion[1], comuna=informacion[2], deporte=deporte, transporte=informacion[3], email=informacion[4], celular=informacion[5])

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

@app.route("/obtener-comunas/<region>")
def obtener_comunas(region):
    comunas = db.listar_comunas(db.obtener_id_region(region))
    return jsonify(list(comunas))

if __name__ == "__main__":
    app.run(debug=True)