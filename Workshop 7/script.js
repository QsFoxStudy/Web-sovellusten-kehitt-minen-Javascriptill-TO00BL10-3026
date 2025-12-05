// Harjoitus 1: JSONin perusteet
var text = '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

function showNames() {
  var obj = JSON.parse(text);
  var output = "";
  for (var i = 0; i < obj.employees.length; i++) {
    output += obj.employees[i].firstName + " " + obj.employees[i].lastName + "<br>";
  }
  document.getElementById("jsondata").innerHTML = output;
}

function showAllData() {
  var obj = JSON.parse(text);
  var output = "";
  for (var i = 0; i < obj.employees.length; i++) {
    output += JSON.stringify(obj.employees[i]) + "<br>";
  }
  document.getElementById("jsondata").innerHTML = output;
}

// Harjoitus 2: JSONin parsiminen verkosta
function loadRawData() {
  fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750")
    .then(response => response.json())
    .then(data => {
      document.getElementById("rawdata").innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error("Virhe haettaessa raakadataa:", error));
}

function loadParsedData() {
  fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750")
    .then(response => response.json())
    .then(data => {
      let html = "<table><tr><th>Otsikko</th><th>Vuosi</th></tr>";
      data.Search.forEach(item => {
        html += `<tr><td>${item.Title}</td><td>${item.Year}</td></tr>`;
      });
      html += "</table>";
      document.getElementById("rawdata").innerHTML = html;
    })
    .catch(error => console.error("Virhe haettaessa parsittua dataa:", error));
}

// Harjoitus 3: OpenWeatherMap API
const apiKey = "ff64c247a136f706923d1ee0d55d71e2";

function getWeatherData() {
  const city = document.getElementById("city").value;
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&mode=JSON&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("weatherdata").innerHTML =
        `Lämpötila: ${data.main.temp} °C<br>` +
        `Pilvisyys: ${data.clouds.all} %<br>` +
        `Tuulen nopeus: ${data.wind.speed} m/s`;
    })
    .catch(error => console.error("Virhe säädatan haussa:", error));
}

function searchCityWeather() {
  const city = document.getElementById("citysearch").value;
  if (city) {
    document.getElementById("city").value = city;
    getWeatherData();
  }
}

function getWeatherDataFromDropdown() {
  getWeatherData();
}

