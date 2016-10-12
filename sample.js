var http = require("http");


function readHTML(url, _printout) {
  var requestOptions = {
    host: url,
    path: "/"
  };

  http.get(requestOptions, (response) => {    // HTTP Response Callback

    response.setEncoding("utf8");             // Use UTF-8 encoding
    var store = "";
    response.on("data", function(data) {           // On Data Received
      store += data;
    });

    response.on("end", function() {                // On Data Completed
      console.log("Response stream complete.");
      _printout(store);
    });
  });
}

function printHTML(htmlData){
  console.log(htmlData);
}


readHTML("www.example.com", printHTML);
