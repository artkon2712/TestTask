

from flask import Flask, render_template
from pyproj import Geod

app = Flask('My_orto')

@app.route('/')
def hi():
    a = 10
    return 'hi' + str(a)

# @app.route("/", methods = ['post', 'get'])

# def get_args ():
#     print('hi')
# def orto (start_pos1, start_pos2, n) :
#     lon0 = start_pos1[0]
#     lat0 = start_pos1[1]
#     lon1 = start_pos2[0]
#     lat1 = start_pos2[1]

#     n_extra_points = n  

#     geoid = Geod(ellps="WGS84")
#     extra_points = geoid.npts(lon0, lat0, lon1, lat1, n_extra_points)
#     return extra_points

app.run(port = 7000, debug = True)




 
# app.run(port=1234)