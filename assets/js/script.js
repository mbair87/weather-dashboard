var cities = [];
var cityHistory = $("#city-history");
var days = $("#days");


getCities();

// get cities from local storage
function getCities() {
  var savedCities = JSON.parse(localStorage.getItem("cities"));

  // push any saved cities from localStorage to cities array
  if (savedCities !== null) {
    cities = savedCities;
  }
  generateCities();
}

//create html elements for cities
function generateCities() {
  
  // create list element for each city
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
$("#city-search").on("click", function (event) {
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
  getWeather(city);
});

//function to get coordinates and run other functions to display weather.
function getWeather(cityName) {
  //get lat and lon coordinates for city
  var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=8251dbb2e3fad51d11bd788bdfe005a3";
  $.get(geoUrl, function (response) {
    //add coordinates to API call
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response[0].lat + "&lon=" + response[0].lon + "&units=imperial" + "&exclude=hourly,minutely,alerts&appid=8251dbb2e3fad51d11bd788bdfe005a3";
    $.get(weatherUrl, function (response) {
      displayWeather(response, cityName);
      displayFiveDay(response, cityName);
    })
  })
};

function displayWeather(data, cityName) {
  var iconUrl = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  var currentWeather = $("#current-weather");
  //clear out previous weather data
  document.getElementById("current-weather").innerHTML = "";
  //convert current date and display
  var h3 = $("<h3>").text(cityName + " " + moment.unix(data.current.dt).format('MMMM Do YYYY'));
  currentWeather.append(h3);
  //get icon image and show on screen
  var currentIcon = $("<img>").attr("src", iconUrl);
  h3.append(currentIcon);
  //get current temp and display on screen
  var currentTemp = $("<p>").text("Temperature: " + data.current.temp + "°F");
  currentWeather.append(currentTemp);
  //get current wind speed and display on screen
  var currentWind = $("<p>").text("Wind: " + data.current.wind_speed + " MPH");
  currentWeather.append(currentWind);
    //get current humidity speed and display on screen
  var currentHumidity = $("<p>").text("Humidity: " + data.current.humidity + "%");
  currentWeather.append(currentHumidity);
    //get current UV Index and display on screen
  var currentUv = $("<p>").text("UV Index: " + data.current.uvi);
  //check level of UV index and assign CSS class for background color
  if (data.current.uvi <= 2) {
    currentUv.attr("class", "low")
  }
  else if (data.current.uvi > 2 && data.current.uvi <= 5) {
    currentUv.attr("class", "moderate")
  }
  else if (data.current.uvi > 5 && data.current.uvi <= 7) {
    currentUv.attr("class", "high")
  }
  else if (data.current.uvi > 7 && data.current.uvi <= 10) {
    currentUv.attr("class", "very-high")
  }
  else {
    currentUv.attr("class", "extreme")
  }
  currentWeather.append(currentUv);
}

//function to show five day weather forecast 
var displayFiveDay = function (data, cityName) {
  // var dayWeather = data.daily[i];

  //clear out previous weather data
  document.getElementById("days").innerHTML = "";
  //loop through daily weather, create html and set weather data
  for (var i = 1; i <= 5; i++) {
    var dayWeather = data.daily[i];
  //get icon for five-day weather
    var dailyIcon = data.daily[i].weather[0].icon;
    var fiveDayIconUrl = `http://openweathermap.org/img/wn/${dailyIcon}.png`
    var fiveDayIcon = $("<img>").attr("src", fiveDayIconUrl);
    var dayDiv = $("<div>").attr("class", "col-3 m-3 bg-primary");
    //get five day date
    var fiveDayh6 = $("<h6>").text(moment.unix(dayWeather.dt).format('l'));
    //get five day temp
    var fiveDayTemp = $("<p>").text("Temperature: " + dayWeather.temp.day + "°F");
    //get five day wind speed
    var fiveDayWind = $("<p>").text("Wind: " + dayWeather.wind_speed + " MPH");
    //get five day humidityh
    var fiveDayHumidity = $("<p>").text("Humidity: " + dayWeather.humidity + "%");
    //clear out any data from previous city
    $("#days").innerHTML = "";
    //push weather data to divs
    fiveDayh6.append(fiveDayIcon);
    dayDiv.append(fiveDayh6);
    dayDiv.append(fiveDayTemp);
    dayDiv.append(fiveDayWind);
    dayDiv.append(fiveDayHumidity);
    days.append(dayDiv);
  }
}

//add ability to click on saved cities 
$(document).on("click", "#list-city", function () {
  var savedCity = $(this).attr("city-data");
  getWeather(savedCity);
});







