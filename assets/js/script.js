var cities = [];
  
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
});



