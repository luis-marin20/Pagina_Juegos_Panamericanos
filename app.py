from flask import Flask, request, render_template, redirect, url_for, session
import python.db as db
import os
import python.validations as val

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/agregar-artesano", methods=["GET", "POST"])
def agregar_artesano():
    if request.method == "GET":
        return render_template("agregar-artesano.html")
    elif request.method == "POST":
        region = request.form["region"]
        comuna = request.form["comuna"]
        artesania = request.form["artesania"]
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
            db.agregar_artesano_tipo(db.obtener_id_artesano(nombre),db.obtener_id_artesania(artesania))
            
            for foto in fotos:
                if foto.filename is not None and foto.filename != "":
                    new_foto = val.fotoSegura(foto)
                    foto.save(os.path.join(app.config["UPLOAD_FOLDER"], new_foto))
                    ruta = os.path.join(app.config["UPLOAD_FOLDER"], new_foto)
                    db.agregar_foto(ruta, new_foto, db.obtener_id_artesano(nombre))

            return redirect(url_for("index"))
        else:
            pass

# @app.route("/procesar_fotos/", methods=["GET"])
# def procesar_fotos():
#     foto1 = request.files["foto1"]
#     foto2 = request.files["foto2"]
#     foto3 = request.files["foto3"]
#     fotos = [foto1, foto2, foto3]
#     for foto in fotos:
#         if foto is not None or foto != "":
#             new_foto = val.fotoSegura(foto)
#             foto.save(os.path.join(app.config["UPLOAD_FOLDER"], new_foto))
#             ruta = os.path.join(app.config["UPLOAD_FOLDER"], new_foto)
#             db.agregar_foto(ruta, new_foto, db.obtener_id_artesano(new_foto))
#     return redirect(url_for("index"))

@app.route("/ver-artesanos", methods=["GET"])
def ver_artesanos():
    artesanos=db.listado_artesanos_foto()
    paginas = {}
    if len(artesanos) > 5:
        pag=1
        for i in range(0, len(artesanos), 5):
            paginas[str(pag)] = artesanos[i:i+5]
            pag+=1
        return render_template("ver-artesanos.html", paginas=paginas)
    else:
        paginas['1'] = artesanos
        return render_template("ver-artesanos.html", paginas=paginas)

@app.route("/informacion-artesanos/<artesano_id>", methods=["GET"])
def informacion_artesanos(artesano_id):
    informacion = db.info_artesano(artesano_id)
    return render_template("informacion-artesano.html", nombre=informacion[0], region=informacion[1], comuna=informacion[2], artesania=informacion[3], foto=informacion[4], email=informacion[5], celular=informacion[6])

if __name__ == "__main__":
    app.run(debug=True)