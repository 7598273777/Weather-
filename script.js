document.addEventListener("DOMContentLoaded", () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => displayCountries(data))
        .catch(error => console.error("Error fetching countries:", error));
});

function displayCountries(countries) {
    const countryList = document.getElementById("country-list");
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-sm-12");

        const cardElement = `
            <div class="card"  >
            <div class="card-header">${country.name.official}</div>
            <div class="card-body" >
                <img class = "img-fluid" src="${country.flags.svg}" alt="Flag" style="max-width: 200px; "/>
                    <p>Capital: ${country.capital}</p>
                    <p>Latlng: ${country.latlng.join(", ")}</p>
                    <p>Region: ${country.region}</p>
                    <p>Population: ${country.population}</p>
                    <p>Native Name: ${country.name.common}</p>
                    <p>Country Code: ${country.fifa}</p>
                    <button type:"submit" class="btn btn-primary" onclick="getWeather('${encodeURIComponent(JSON.stringify(country))}')">Click for Weather</button>
                   
            </div>
            </div>
        `;
        card.innerHTML = cardElement;
        countryList.appendChild(card);
    });
}

function getWeather(countryName) {
   //console.log(JSON.parse(decodeURIComponent(countryName))) // decode string to object 
   console.log(countryName.latlng)
   let country = JSON.parse(decodeURIComponent(countryName))
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=a2a78ba8ad59c7031017a8cb74d0d90f`)
        .then(response => response.json())
        .then(data => alert(`Weather in ${country.name.official}: ${data.weather[0].description}. Temperature: ${data.main.temp}°C. Humidity: ${data.main.humidity}%`))
        .catch(error => console.error("Error fetching weather:", error));
}
