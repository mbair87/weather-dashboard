var cities = [];
var cityHistory =$("#city-history");
var days =$("#days");


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
  event.preventDefault();
  // get value from city input search field
  var city = $("#city-input").val().trim();

  //add city from input to cities array
  cities.push(city)
  console.log(city);
  saveCities();
  generateCities();
  getWeather(city);
});

var getWeather = function(cityName) {
    //get lat and lon coordinates for city
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=8251dbb2e3fad51d11bd788bdfe005a3";
    $.get(geoUrl, function(response){
        //add coordinates to API call
        var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+response[0].lat +"&lon=" +response[0].lon+ "&units=imperial"+"&exclude=hourly,minutely,alerts&appid=8251dbb2e3fad51d11bd788bdfe005a3";
        $.get(weatherUrl, function(response){
          console.log(response);   
          displayWeather(response, cityName);
          displayFiveDay(response, cityName);
        })
    })
};

var displayWeather = function(weather, cityName) {
    var iconUrl =`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png` 
    var currentWeather=$("#current-weather");
    var h3=$("<h3>").text(cityName + " " + moment.unix(weather.current.dt).format('MMMM Do YYYY'));
    // var currentDate=$("<h3>").text(moment.unix(weather.current.dt).format('MMMM Do YYYY, h:mm a'));
    currentWeather.append(h3);
    var currentIcon=$("<img>").attr("src", iconUrl);
    h3.append(currentIcon);
    // currentWeather.append(currentDate);
    var currentTemp=$("<p>").text("Temperature: " + weather.current.temp + "°F");
    currentWeather.append(currentTemp);
    var currentWind=$("<p>").text("Wind: " + weather.current.wind_speed + " MPH");
    currentWeather.append(currentWind);
    var currentHumidity=$("<p>").text("Humidity: " + weather.current.humidity + "%");
    currentWeather.append(currentHumidity);
    var currentUv=$("<p>").text("UV Index: " + weather.current.uvi);
    currentWeather.append(currentUv);
} 

var displayFiveDay = function(weather, cityName) {
    for (var i = 1; i <= 5; i++) {
        var dayWeather = weather.daily[i];
        var dayDiv = $("<div>");
        dayDiv.attr;("class","col-3 m-2 bg-primary")
      var fiveDayh6= $("<h6>").text(moment.unix(weather.daily[i].dt).format('l'));
dayDiv.append(fiveDayh6);
      days.append(dayDiv);
    }
}






