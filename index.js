const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "08cc6f461ecbefb7043b5d7bcf48cf93";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a city");
    }

});

async function getWeatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        console.log(response);

        if(!response.ok){
            throw new Error("Oops! location not founde!")
          

        }
        return await response.json();
}

function displayWeatherInfo(data){
    
    const { name : city,
            main : {temp,humidity},
            weather : [{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";  
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}\u00B0c `;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id)


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
          return " 	&#x26c8;" ;
        case(weatherId >= 300 && weatherId < 400):
          return " 	&#x1f327;" ;
        case(weatherId >= 500 && weatherId < 600):
          return " 	&#x1f327;" ;
        case(weatherId >= 600 && weatherId < 700):
          return " 	&#x2744;" ;
        case(weatherId >= 700 && weatherId < 800):
          return " 🌫️" ;   
        case(weatherId === 800):
          return " 🌞" ;  
        case(weatherId >= 801 && weatherId < 810):
          return " ☁️" ;  
        default:
            return "❓" ; 

        

    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");  
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay );
   
}