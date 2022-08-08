const map = L.map('map').setView([33.33,33.33], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 15
}).addTo(map)

const tileLayer = new  L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

startPos1 = [60, 5]
startPos2 = [67, 55]
document.getElementById('point1').value = `POINT(${startPos1[0]} ${startPos1[1]})`
document.getElementById('point2').value = `POINT(${startPos2[0]} ${startPos2[1]})`
                            
const marker = L.marker(startPos1,{
    draggable: true
}).addTo(map);
const marker2 = L.marker(startPos2,{
    draggable: true
}).addTo(map);

let coords = [marker.getLatLng() , marker2.getLatLng()]
let polyline = L.polyline(coords,{color:'red'}).addTo(map)

map.fitBounds(polyline.getBounds());

marker.on('drag', function (e) {
    polyline.remove()
    document.getElementById('point1').value = `POINT(${marker.getLatLng().lat} ${marker.getLatLng().lng})`;                        
});

marker2.on('drag', function (e) {       
    polyline.remove()                     
    document.getElementById('point2').value = `POINT(${marker2.getLatLng().lat} ${marker2.getLatLng().lng})`; 
});

document.getElementById('point1').onchange = function(e){
    polyline.remove()
    const newCoords = L.latLng(Terraformer.WKT.parse(document.getElementById('point1').value).coordinates[0], Terraformer.WKT.parse(document.getElementById('point1').value).coordinates[1])
    marker.setLatLng(newCoords)
}

document.getElementById('point2').onchange = function(e){
    polyline.remove()
    const newCoords = L.latLng(Terraformer.WKT.parse(document.getElementById('point2').value).coordinates[0], Terraformer.WKT.parse(document.getElementById('point2').value).coordinates[1])
    marker.setLatLng(newCoords)
}

document.getElementById('form').onsubmit = function(e) {
    e.preventDefault()
    document.getElementById('point1').value
    document.getElementById('point2').value
    Terraformer.WKT.parse(document.getElementById('point1').value).coordinates[0]

    let startPos1 = [ Terraformer.WKT.parse(document.getElementById('point1').value).coordinates[0], Terraformer.WKT.parse(document.getElementById('point1').value).coordinates[1] ]
    let startPos2 = [ Terraformer.WKT.parse(document.getElementById('point2').value).coordinates[0], Terraformer.WKT.parse(document.getElementById('point2').value).coordinates[1] ]
    
    let n = parseInt(document.getElementById('countNum').value)
    fetchData(startPos1, startPos2, n)
}

const fetchData = async (startPos1, startPos2, n) => {                    
    const BASE_URL = 'http://127.0.0.1:7000'
    body = {
        startPos1,
        startPos2,
        n,
    } 
    const response = await fetch(BASE_URL + "/orto", {
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    const points = data.points.reduce((accum, point) => accum = [ ...accum, L.latLng(point[0], point[1]) ], [])    

    const startPos1LatLng = L.latLng(startPos1[0], startPos1[1])
    const startPos2LatLng = L.latLng(startPos2[0], startPos2[1])

    polyline.remove()

    let coords = [startPos1LatLng, ...points, startPos2LatLng]
    polyline = L.polyline(coords, { color:'red' }).addTo(map)
    map.fitBounds(polyline.getBounds());
}