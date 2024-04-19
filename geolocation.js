const x = document.getElementById("geolocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocalizzazione non supportata.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitudine: " + position.coords.latitude +
        "<br>Longitudine: " + position.coords.longitude; 
}