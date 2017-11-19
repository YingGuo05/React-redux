import axios from 'axios'
const API_KEY ='ee73a692d6d3cf8361377b44450c5718'
const ROUT_URL=`http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
export const FETCH_WEATHER = 'FETCH_WEATHER'
export function fetchWeather(city)
{   const url = `${ROUT_URL}&q=${city},us`
    const request = axios.get(url);
    return{
        type:FETCH_WEATHER,
        payload:request
    }
}