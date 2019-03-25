const request = require('request');
const fs = require('fs');

var getcapital = ((country) => {
    return new Promise((resolve, reject) =>{
        request({
            // https://restcountries.eu/rest/v2/name/canada?fullText=true
            url: `https://restcountries.eu/rest/v2/name/` + encodeURIComponent(country) + `?fullText=true`,
            json: true
        }, (error, response, body) => {
            // console.log(body)
            if(error) {
                reject(error);
            }
            else if (body.status == '404')
            {
                reject(body.message);
            }
            
            else
            {
                resolve(JSON.parse(body)[0].capital);
                resolve(body[0].capital);
            }
        });
    });
});
var getWeather = ((city, country) => {
    return new Promise((resolve, reject) => {
        request({
            // https://api.openweathermap.org/data/2.5/weather?q=ottawa,canada&appid=2264e3b73dc094131aeb3adfa3d71b61
            url: `https://api.openweathermap.org/data/2.5/weather?q=`+ encodeURIComponent(city) +',' + encodeURIComponent(country) + `&appid=2264e3b73dc094131aeb3adfa3d71b61`,
            json:true
        }, (error, response, body) => {
            // resolve((body.main.temp)); //, body.wind.speed
            resolve({
                temp: body.main.temp,
                wind: body.wind.speed
            });
        });
    });
});

module.exports = {
    getcapital,
    getWeather
}