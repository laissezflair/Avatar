var request = require('request');

request.get("http://www.downforeveryoneorjustme.com", (err, response, body) => {
  console.log("Here's the HTML: " + body);
});

function readHTML(url, callback){

}