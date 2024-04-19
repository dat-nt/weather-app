const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const weatherApp = $(".weather-app");
const temperature = $(".temperature");
const cityOutput = $(".city-time .name");
const dateOutput = $(".date");
const timeOutput = $(".time");
const condition = $(".condition");
const form = $("#cityInput");
const search = $(".search");
const btnSearch = $(".submit");
const icon = $(".icon");
const cloud = $(".cloud");
const humidity = $(".humidity");
const wind = $(".wind");
const cities = $$(".city");

// Default city
let inputCity = "Hanoi";

function fetchData() {
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=83ce26174da64086b15140754241804&q=${inputCity}&aqi=no`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            temperature.innerHTML = data.current.temp_c + "&#176;"
            cityOutput.innerHTML = data.location.name;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            dateOutput.innerHTML = `${getWeekDay(d, m, y)}, ${d}/${m}/${y}`;
            timeOutput.innerHTML = date.substr(11);

            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./assets/icon/" + iconId;
            condition.innerHTML = data.current.condition.text;

            cloud.innerHTML = data.current.cloud + "%";
            humidity.innerHTML = data.current.humidity + "%";
            wind.innerHTML = data.current.wind_kph + "km/h";


            const timeOfday = data.current.is_day ? "day" : "night";
            const code = data.current.condition.code;
            if (code === 1000) {
                weatherApp.style.backgroundImage = `url(./assets/image/${timeOfday}/clear.jpg)`;
                timeOfday === "night"
                    ? btnSearch.style.backgroundColor = "#181e27"
                    : btnSearch.style.backgroundColor = "#e6ba93";

            }
            else if (
                [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)
            ) {
                weatherApp.style.backgroundImage = `url(./assets/image/${timeOfday}/cloudy.jpg)`;
                timeOfday === "night"
                    ? btnSearch.backgroundColor = "#181e27"
                    : btnSearch.style.backgroundColor = "#fa6d1b";
            }
            else if (
                [1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1252].includes[code]
            ) {
                weatherApp.style.backgroundImage = `url(./assets/image/${timeOfday}/rainy.jpg)`
                timeOfday === "night"
                    ? btnSearch.style.backgroundColor = "#325c80"
                    : btnSearch.style.backgroundColor = "#647d75";

            } else {
                weatherApp.style.backgroundImage = `url(./assets/image/${timeOfday}/snowy.jpg)`
                timeOfday === "night"
                    ? btnSearch.style.backgroundColor = "#1b1b1b"
                    : btnSearch.style.backgroundColor = "#4d72aa";
            }
            weatherApp.style.opacity = "1";
        })
        .catch(() => {
            alert("City not found, please try again");
            weatherApp.style.opacity = "1";
        })
}

function getWeekDay(day, month, year) {
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const index = new Date(`${year}/${month}/${day}`).getDay();
    return weekDay[index];
}

fetchData();

// Handle events
cities.forEach((city) => {
    city.onclick = (event) => {
        inputCity = event.target.innerHTML;
        fetchData();
        weatherApp.style.opacity = "0.3";
    };
});

form.onsubmit = (event) => {
    event.preventDefault();
    if (search.value.trim().length === 0) {
        alert("Please enter a city name!");
    } else {
        inputCity = search.value.trim();
        fetchData();
        search.value = "";
        weatherApp.style.opacity = "0.3";
    }
};
