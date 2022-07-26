from flask import Flask, jsonify, request, render_template
from pyproj import Geod

app = Flask('my_first_server')
@app.route("/")
def index():
    return render_template('index.html')
# @app.route("/orto")
# def orto (start_pos1, start_pos2, n) :
#         lon0 = start_pos1[0]
#         lat0 = start_pos1[1]
#         lon1 = start_pos2[0]
#         lat1 = start_pos2[1]

#         n_extra_points = n  

#         geoid = Geod(ellps="WGS84")
#         extra_points = geoid.npts(lon0, lat0, lon1, lat1, n_extra_points)
#         return extra_points

 
app.run(port=1234)