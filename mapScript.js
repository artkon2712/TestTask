const map = L.map('map').setView([33.33,33.33], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 15
}).addTo(map)

const tileLayer = new  L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
// сюда должны приходить точки, отправленные из формы, надо релаизовать конвертацию в WKT
startPos1 = [60.441767, 5.470247]
startPos2 = [67.441767, 55.470247]
                            
const marker = L.marker(startPos1,{
    draggable: true
}).addTo(map);
const marker2 = L.marker(startPos2,{
    draggable: true
}).addTo(map);

          
marker.on('drag', function (e) {
    document.querySelector('#point1').value = marker.getLatLng();                        
});
marker2.on('drag', function (e) {                            
    document.querySelector('#point2').value = marker2.getLatLng();
});
                        
let coords = [marker.getLatLng() , marker2.getLatLng()]
let polyline = L.polyline(coords,{color:'red'}).addTo(map)
map.fitBounds(polyline.getBounds());


                        
const url = 'http://127.0.0.1:7000/'
n = 10 
const request = fetch(url, {
    method:'POST',
    n: n
})


sub = document.querySelector('form')

sub.addEventListener ('click', request())
