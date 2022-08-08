


from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from pyproj import Geod


app = Flask('My_orto')
CORS(app)

@app.route('/')
def hi():
    
    return 'hi' 

# @app.route('/get', methods = ['get', 'post'])
# def get():
    
#     parameters_map = request.get_json(force = True)
#     parameters_map['a'] = parameters_map['a']*2
#     return parameters_map

@app.route("/orto", methods = ['post'])
def ortoHandler():
    body = request.get_json()

    response = { 'points': orto(body['startPos1'], body['startPos2'], body['n']) }
    return response

def orto (start_pos1, start_pos2, n) :
    lon0 = start_pos1[0]
    lat0 = start_pos1[1]
    lon1 = start_pos2[0]
    lat1 = start_pos2[1]

    n_extra_points = n  

    geoid = Geod(ellps="WGS84")
    extra_points = geoid.npts(lon0, lat0, lon1, lat1, n_extra_points)
    return extra_points

app.run(port = 7000, debug = True)
