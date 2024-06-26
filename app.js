//Il Modulo D3 carica il csv e dopodichè lo filtra...

// MOCK PER GEOLOCALIZZAZIONE FAKE
const stazioneLodiLatitude = 45.309217;
const stazioneLodiLongitude = 9.4976017;

var lat = '';
var lon = '';

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
}

getLocation();

function loadCSV(csvIdentifier) { 
    console.log("id string:", csvIdentifier);

    let csvName;

    switch (csvIdentifier) {
        case 1:
            csvName = "Milano.csv";
            console.log("load Milano.csv");
            break;
        case 2:
            csvName = "Lodi.csv";
            console.log("load Lodi.csv");
            break;
        case 3:
            csvName = "Pavia.csv";
            console.log("load Pavia.csv");
            break;
        case 4:
            csvName = "Piacenza.csv";
            console.log("load Piacenza.csv");
            break;
        case 5:
            csvName = "Roma.csv";
            console.log("load Roma.csv");
            break;
        case 6:
            csvName = "Napoli.csv";
            console.log("load Napoli.csv");
            break;
        case 7:
            csvName = "Torino.csv";
            console.log("load Torino.csv");
            break;
        case 8:
            csvName = "Palermo.csv";
            console.log("load Palermo.csv");
            break;
        case 9:
            csvName = "Genova.csv";
            console.log("load Genova.csv");
            break;
        case 10:
            csvName = "Bologna.csv";
            console.log("load Bologna.csv");
            break;
        case 11:
            csvName = "Firenze.csv";
            console.log("load Firenze.csv");
            break;
        case 12:
            csvName = "Bari.csv";
            console.log("load Bari.csv");
            break;
        case 13:
            csvName = "Venezia.csv";
            console.log("load Venezia.csv");
            break;
        case 14:
            csvName = "Trieste.csv";
            console.log("load Trieste.csv");
            break;
        case 15:
            csvName = "Cagliari.csv";
            console.log("load Cagliari.csv");
            break;
        case 16:
            csvName = "Trento.csv";
            console.log("load Trento.csv");
            break;
        case 17:
            csvName = "Ancona.csv";
            console.log("load Ancona.csv");
            break;
        case 18:
            csvName = "Catanzaro.csv";
            console.log("load Catanzaro.csv");
            break;
        case 19:
            csvName = "L'Aquila.csv";
            console.log("load L'Aquila.csv");
            break;
        case 20:
            csvName = "Potenza.csv";
            console.log("load Potenza.csv");
            break;
        default:
            csvName = "default";
    }

    d3.csv(csvName).then(function(data) {
        console.log("Carica CSV");
        //Definizione delle variabili

        var PostiLodi = data;
        var button = d3.select("#button");
        var form = d3.select("#form");

        //Interazione dell'utente con gli oggetti che fa partire la funzione runEnter

        button.on("click", runEnter);
        form.on("submit", runEnter);

        //Definizione della funzione runEnter

        function runEnter() {

            console.log(lat);
            console.log(lng);

            d3.select("tbody").html("")
            d3.selectAll("p").classed('noresults', true).html("")
            d3.event.preventDefault();

            //Viene preso in entrata l'input dell'utente e poi ripulito nella riga successiva come nuova variabile...

            var inputElement = d3.select("#user-input");
            var inputValue = inputElement.property("value").toLowerCase().trim();

            //Primo check: l'input dell'utente è troppo breve...

            if (inputValue.length < 3) {
                d3.select("p").classed('noresults2', true).html("<center><strong>Parola troppo corta! Digita almeno 3 lettere!</strong>")
                inputValue = "Something to give no results"
            }

            //Qui avviene la magia: filtro in base al nome del locale partendo dall'input utente

            var filteredData = PostiLodi.filter(PostiLodi => PostiLodi.categories.toLowerCase().trim().includes(inputValue));

            //Secondo check: l'input utente è assente nel csv

            if (filteredData.length === 0 && inputValue !== "Something to give no results") {
                d3.select("p").classed('noresults', true).html("<center><strong>Nessun risultato trovato!</strong>")
            }

            //Definizione della matrice output giá ordinata dal voto più alto a quello più basso 

            output = _.sortBy(filteredData, 'rating').reverse()
            console.log("Posti entro un 1 Km -----")

            for (var i = 0; i < output.length; i++) {
                if (getDistanceFromLatLonInKm(stazioneLodiLatitude, stazioneLodiLongitude, output[i]['latitude'], output[i]['longitude']) <= 1) {
                    console.log(output[i]['name']);
                }
            }

            console.log("----------")


            //Qui viene stampata la tabella finale
            for (var i = 0; i < filteredData.length; i++) {
                if (getDistanceFromLatLonInKm(lat, lng, output[i]['latitude'], output[i]['longitude']) <= 1000) {
                    d3.select("tbody").append("tr").html(
                        "<td>" + (output[i]['name']) + "</td>" +
                        "<td><a href=" + "\"https://maps.google.com?q=" + (output[i]['name']) + ", " + (output[i]['fulladdr']) + "\">" + (output[i]['fulladdr']) + "</a></td>" +
                        "<td>" + (output[i]['rating']) + "</td>" +
                        "<td>" + (output[i]['reviews']) + "</td>" +
                        "<td>" + (getDistanceFromLatLonInKm(lat, lng, output[i]['latitude'], output[i]['longitude'])) + "</td>")
                }
            }
        }
    });
}

window.resizeTo(screen.width, screen.height)

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // raggio Terra
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dis = R * c; //distanza in linea d'aria in Km

    var dis2 = Math.round(dis * 100) / 100;

    return dis2;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}