import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('json/querys.json','r') as querys:
    QUERY_DICT = json.load(querys)

#Coneccion a la base de datos  
def get_connection():
    connection = pymysql.connect(
        db = DB_NAME,
        user = DB_USERNAME,
        passwd = DB_PASSWORD,
        host = DB_HOST,
        port = DB_PORT,
        charset = DB_CHARSET
    )
    return connection

#Ejecucion de querys

def agregar_artesano(comuna_id, descripcion_artesania, nombre, email, celular):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['agregar_artesano'], (comuna_id, descripcion_artesania, nombre, email, celular))
    connection.commit()

def listado_artesanos():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos'])
    return cursor.fetchall()

def listado_artesanos_foto():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos_foto'])
    return cursor.fetchall()

def listado_artesanos_primeros_5():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos_primeros_5'])
    return cursor.fetchall()

def listado_artesanos_siguientes_5():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos_siguientes_5'])
    return cursor.fetchall()

def listado_artesanos_siguientes_5_comuna():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos_siguientes_5_comuna'])
    return cursor.fetchall()

def listado_artesanos_primeros_5_foto():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listado_artesanos_primeros_5_foto'])
    return cursor.fetchall()

def agregar_artesano_tipo(artesano_id, tipo_artesania_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['agregar_artesano_tipo'], (artesano_id, tipo_artesania_id))
    connection.commit()

def obtener_tipo_artesania(artesano_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_tipo_artesania'], (artesano_id))
    return cursor.fetchall()

def agregar_foto(ruta_archivo, nombre_archivo, artesano_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['agregar_foto'], (ruta_archivo, nombre_archivo, artesano_id))
    connection.commit()

def obtener_foto(artesano_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_foto'], (artesano_id))
    return cursor.fetchall()

def obtener_ultimo_id():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_ultimo_id'])
    return cursor.fetchone()

def obtener_id_comuna(nombre_comuna):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_id_comuna'], (nombre_comuna))
    return cursor.fetchone()

def obtener_id_artesania(nombre_artesania):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_id_artesania'], (nombre_artesania))
    return cursor.fetchone()

def obtener_id_artesano(nombre_artesano):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_id_artesano'], (nombre_artesano))
    return cursor.fetchone()

def obtener_id_region(nombre_region):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['obtener_id_region'], (nombre_region))
    return cursor.fetchone()

def info_artesano(artesano_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['informacion_artesano'], (artesano_id))
    return cursor.fetchone()

def listar_regiones():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listar_regiones'])
    return cursor.fetchall()

def listar_comunas(region_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(QUERY_DICT['listar_comunas'], (region_id))
    return cursor.fetchall()