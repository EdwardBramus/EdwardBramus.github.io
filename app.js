d3.csv("Posti Lodi.csv").then(function (data) {

  var movies = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    if (inputValue.length < 6){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
      inputValue = "Something to give no results"
    }

    var filteredData = movies.filter(movies => movies.name.toLowerCase().trim().includes(inputValue));

    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }

    output = _.sortBy(filteredData, 'rating').reverse()

    for (var i = 0; i < filteredMovies.length; i++) {d3.select("tbody").insert("tr").html(
      "<td>" + [i+1] + "</td>" +
      "<td>" + (output[i]['name'])+"</a>"+"</td>" + 
      "<td>" + (output[i]['reviews'])+"</td>" +
      "<td>" + (output[i]['rating'])+"</td>" +
      "<td>" + (output[i]['description'])+"</td" ) }};

  window.resizeTo(screen.width,screen.height)


});
