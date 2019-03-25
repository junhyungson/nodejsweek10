const express = require('express');
const hbs = require('hbs');
var app = express();
const from_api = require('./challengeapi.js');
fs = require('fs');

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

hbs.registerHelper('getheaderhours', () => {
    return new Date().getHours();
})

app.use((request, response, next) => {
    var time = new Date().toString();
    // console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('unable to log message');
        }
    })
    next();
});

app.use((request, response, next) =>{
    var log = 'the site is currently down for a maintenance';
    response.render('maintenance.hbs', {
        maintenance: log
    });
    // next();
});

app.get('/', (request, response) => {
    // response.send('<a href="about.hbs">about</a> <a href="weather.hbs">weather</a>');
    response.render('main.hbs', {
        title: 'main title page',
        welcome: 'welcome',
        header_welcome: 'header'
    })
});

app.get('/info', (request, response)=> {
    response.render('about.hbs', {
        title: 'title\'s About Page',
        welcome: 'welcome to about\'s ifno page',
        header_welcome: 'welcome to header\'s info page'
    });
});

var result='';
var country = 'canada'
var errormessage = ''
var getWeather = async function()
{
    try{
  capitalResult =  await from_api.getcapital(country);
weatherResult = await from_api.getWeather(capitalResult,country);

        result = `the weather in ${capitalResult}, capital of ${country} is 
        ${JSON.stringify(Weatherresult.temp)} with wind speed of ${JSON.stringify(Weatherresult.wind)}`;
    }
catch(error) {
    result = error;
}
}
app.get('/weather', async (request, response)=> {
    getWeather();
console.log(result);
    response.render('weather.hbs', {
        title: 'title\'s weather page',
        welcome: 'welcome to weather page',
        header_welcome: 'welcome to header\'s weather page',
        weather: result,
        // errorm_message: errormessage
    });
});


app.get('/404', (request, response) => {
    response.send({
        error: 'page not found'
    })
});
app.listen(port, () => {
    console.log(`server is up on the port ${port}`);
});
