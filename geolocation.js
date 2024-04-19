const x = document.getElementById("geolocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalizzazione non supportata.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    x.innerHTML = "Latitudine: " + lat +
        "<br>Longitudine: " + lng; 
}
