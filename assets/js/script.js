var cities = [];
var cityHistory =$("#city-history");
var days =$("#days");
// var dailyIcon = data.daily[i].weather[0].icon;


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
 cityHistory.empty();
    // create list elemet for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      var li = $("<li>").text(city);
      li.attr("class", "list-group-item");
      li.attr("city-data", city);
      li.attr("id", "list-city");
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
//prevent blanks from being submitted
  if (city === "") {
    return;
}

  //add city from input to cities array
  cities.push(city)
  console.log(city);
  saveCities();
//   generateCities();
  getWeather(city);
});

function getWeather(cityName) {
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

function displayWeather(data, cityName) {
    var iconUrl =`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png` 
    var currentWeather=$("#current-weather");
    //clear out previous weather data
    document.getElementById("current-weather").innerHTML = "";
    var h3=$("<h3>").text(cityName + " " + moment.unix(data.current.dt).format('MMMM Do YYYY'));
    // var currentDate=$("<h3>").text(moment.unix(weather.current.dt).format('MMMM Do YYYY, h:mm a'));
    currentWeather.append(h3);
    var currentIcon=$("<img>").attr("src", iconUrl);
    h3.append(currentIcon);
    // currentWeather.append(currentDate);
    var currentTemp=$("<p>").text("Temperature: " + data.current.temp + "°F");
    currentWeather.append(currentTemp);
    var currentWind=$("<p>").text("Wind: " + data.current.wind_speed + " MPH");
    currentWeather.append(currentWind);
    var currentHumidity=$("<p>").text("Humidity: " + data.current.humidity + "%");
    currentWeather.append(currentHumidity);
    var currentUv=$("<p>").text("UV Index: " + data.current.uvi);
    if(data.current.uvi <=2){
        currentUv.attr("class","low")
    }
    else if (data.current.uvi > 2 && data.current.uvi <= 5){
        currentUv.attr("class","moderate")
    }
    else if (data.current.uvi >5 && data.current.uvi <= 7){
        currentUv.attr("class","high")
    }
    else if (data.current.uvi >7 && data.current.uvi <= 10){
        currentUv.attr("class","very-high")
    }
    else{
        currentUv.attr("class","extreme")
    }
    currentWeather.append(currentUv);
} 

var displayFiveDay = function(data, cityName) {
    var dayWeather = data.daily[i];
    //clear out previous weather data
    document.getElementById("days").innerHTML = "";
    // var dailyIcon = data.daily[i].weather[0].icon;
    // var fiveDayIconUrl =`http://openweathermap.org/img/wn/${dailyIcon}@2x.png` 
    // var fiveDayIcon=$("<img>").attr("src", fiveDayIconUrl);
    for (var i = 1; i <= 5; i++) {
        var dayWeather = data.daily[i];
        var dayDiv = $("<div>").attr("class","col-3 m-3 bg-primary");
      var fiveDayh6= $("<h6>").text(moment.unix(dayWeather.dt).format('l'));
      var fiveDayTemp=$("<p>").text("Temperature: " + dayWeather.temp.day + "°F");
      var fiveDayWind=$("<p>").text("Wind: " + dayWeather.wind_speed + " MPH");
      var fiveDayHumidity=$("<p>").text("Humidity: " + dayWeather.humidity + "%");
// fiveDayh6.append(fiveDayIcon);
$("#days").innerHTML = "";
      dayDiv.append(fiveDayh6);
      dayDiv.append(fiveDayTemp);
      dayDiv.append(fiveDayWind);
      dayDiv.append(fiveDayHumidity);
      days.append(dayDiv);
    }
}

//add ability to click on saved cities 
$(document).on("click", "#list-city", function() {
    var savedCity = $(this).attr("city-data");
    getWeather(savedCity);
  });







