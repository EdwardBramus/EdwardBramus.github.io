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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // raggio Terra
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dis = R * c; // distanza in linea d'aria in Km

    return dis;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}