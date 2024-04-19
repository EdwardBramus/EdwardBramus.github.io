const x = document.getElementById("geolocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalizzazione non supportata.";
    }
}

getLocation();

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    console.log(lat);
    console.log(lng);
    x.innerHTML = "Latitudine: " + lat +
        "<br>Longitudine: " + lng; 
}
