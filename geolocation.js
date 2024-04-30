var lat = '';
var lon = '';

const x = document.getElementById("geolocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalizzazione non supportata.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    console.log(lat);
    console.log(lng);
    x.innerHTML = "Latitudine: " + lat +
        "<br>Longitudine: " + lng; 
}
