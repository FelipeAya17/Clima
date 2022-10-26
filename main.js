const api = {
key: '9e122cd782b2d0333f5fe4e7fa192062',
url: 'https://api.openweathermap.org/data/2.5/weather'
}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImg(data){
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-mid.png';
    if (temp > 26){
        src = 'images/temp-high.png';
    }else if(temp < 20){
        src = 'images/temp-low.png'
    }
    tempImg.src = src;
}

async function search(query) {
    try{
        //const response =  await fetch(`${api.url}?=${query}&appid=${api.key}`)
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}`);
        const data = await response.json();
        console.log(data);
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        //toLocaleDateString trae nuestra fecha actual
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelsius(data.main.temp);
        weather.innerHTML =  data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`
        updateImg(data);
    }catch(err){
        console.log(err);
        alert('Hubo un error');
    }
}

function toCelsius(kelvin){
    return Math.round(kelvin - 273.15);
}

function onSubmit(event){
    event.preventDefault();
    search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true)
