
function runEnter() {
d3.select(“tbody”).html(“”) 
d3.event.preventDefault(); 
var inputValue = d3.select(“#user-input”).property("value");
var filteredMovies = movies.filter(movies => movies.actors.includes(inputValue));
var output = _.sortBy(filteredMovies, ‘avg_vote’).reverse()
for (var i = 0; i < filteredMovies.length; i++) {d3.select(“tbody”).insert(“tr”).html(
“<td>” + [i+1] + ”</td>” +
”<td>” + (output[i][‘original_title’])+”</a>”+“</td>” + 
”<td>” + (output[i][‘avg_vote’])+”</td>” +
”<td>” + (output[i][‘year’])+”</td>” +
”<td>” + (output[i][‘description’])+”</td” ) }
  };
  }

d3.csv(“Posti Lodi.csv”).then(function (data) 
{var movies = data;var button = d3.select(“#button”);
var form = d3.select(“#form”);
button.on(“click”, runEnter);
form.on(“submit”, runEnter);
}
