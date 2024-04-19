//Il Modulo D3 carica il csv e dopodichè lo filtra...

import {
    getDistanceFromLatLonInKm
} from './geolocation.js'; // Mi importo la funzione per calcolare la distanza da geolocation

// MOCK PER GEOLOCALIZZAZIONE FAKE
const stazioneLodiLatitude = 45.309217326050074;
const stazioneLodiLongitude = 9.497601714830633;

d3.csv("PostiLodi.csv").then(function(data) {

    //Definizione delle variabili

    var PostiLodi = data;
    var button = d3.select("#button");
    var form = d3.select("#form");

    //Interazione dell'utente con gli oggetti che fa partire la funzione runEnter

    button.on("click", runEnter);
    form.on("submit", runEnter);

    //Definizione della funzione runEnter

    function runEnter() {

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

        for (var i = 0; i < output.length; i++) {
            if getDistanceFromLatLonInKm(stazioneLodiLatitude, stazioneLodiLongitude, output[i]['latitude'], output[i]['longitude']) <= 1  {
                console.log(output[i]['name'])
            }
        }

        //Qui viene stampata la tabella finale

        for (var i = 0; i < filteredData.length; i++) {
            d3.select("tbody").insert("tr").html(
                "<td>" + (output[i]['name']) + "</td>" +
                "<td><a href=" + "\"https://maps.google.com?q=" + (output[i]['name']) + "\">" + (output[i]['fulladdr']) + "</a></td>" +
                "<td>" + (output[i]['reviews']) + "</td>" +
                "<td>" + (output[i]['rating']) + "</td>")
        }
    };

    window.resizeTo(screen.width, screen.height)


});