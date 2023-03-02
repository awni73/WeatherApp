const locationIcon = document.querySelector(".location-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

var input= document.getElementById("search")
let city = ""
let latitude = 0.0
let longitude = 0.0


input-addEventListener("keyup", function(event){
  
    if(event.key === 13){
        event.preventDefault();
        
        city=input.value
        getSearchWeather(city)
        console.log(city)
    }
    
})

const weather = {}

weather.temperature = {
    unit: "fahrenheit"
}

const KELVIN = 256

const key='08bdb4d67b1acf36d10f60e307e3bebf'

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}   else{
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = '<p> Browser does not support geolocation! </p>'
}

function setPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    
    getWeather(latitude, longitude)
}

locationIcon.addEventListener("click", function(event){
    console.log('hey')
    getWeather(latitude, longitude)
})

function showError(error) {
    notificationElement.style.display="block"
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

function getSearchWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q='+input.value+&appid=${key}`)
    .then(function (response){
        let data = response.json()
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp -KELVIN)
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
    })
    .then(function(){
        displayWeather()
    })
}
function getWeather(latitude, longitude) {

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
    .then(function (response){
        let data = response.json()
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp -KELVIN)
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.city = data.name
        weather.country = data.sys.country
    })
    .then(function(){
        displayWeather()
    })
}

function displayWeather() {
    tempElement.innerHTML = `${weather.temperature.value} *<span>F<span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}