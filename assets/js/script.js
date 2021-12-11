var cities = [];
var cityHistory =$("#city-history");
 

getCities();

// get cities from local storage
function getCities(){ 
    var savedCities = JSON.parse(localStorage.getItem("cities"));

    // push any saved cities from localStorage to cities array
    if (savedCities !== null) {
        cities = savedCities;
      }
    generateCities();
    
    console.log(cities);
}

//create html elements for cities
function generateCities() {
 
    // create list elemet for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      var li = $("<li>").text(city);
      li.attr("class", "list-group-item");
      cityHistory.prepend(li);
    }
}   

//save cities to local storage
 function saveCities() {
     localStorage.setItem("cities", JSON.stringify(cities));
     console.log(localStorage);
 }

//click listener on search button
  $("#city-search").on("click", function(event){
  
  // get value from city input search field
  var city = $("#city-input").val().trim();

  //add city from input to cities array
  cities.push(city)
  console.log(city);
  saveCities();
  generateCities();
});



