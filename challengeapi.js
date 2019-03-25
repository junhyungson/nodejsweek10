const request = require('request');


var getcapital = ((capital) => {
    return new Promise((resolve, reject) =>{
        request({
            url: `https://restcountries.eu/rest/v2/name/` + encodeURIComponent(capital) + `?fullText=true`
        }, (error, response, body) => {
            if(error) {
                reject(error);
            }else{
                
                resolve(typeof JSON.parse(body));
            }
        });
       
    });
});

module.exports = {
    getcapital
}