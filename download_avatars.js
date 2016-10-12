var request = require('request');
var http = require('http');
var fs = require('fs');

var sourceArgs = process.argv.slice(2);

console.log(sourceArgs);

var options = {
      url: "https://api.github.com/repos/" + sourceArgs[0] + "/" + sourceArgs[1] + "/contributors",
      headers: {
        'User-Agent': "lighthouse-labs"
      }
    };

/* Read data from GitHub contributors API */

function getRepoContributors(repoOwner, repoName, _callback) {
  request.get(options, function(err, data) {
    var contribUrls = JSON.parse(data.body);
    for (var i = 0; i < contribUrls.length; i++){
      downloadImageByURL(contribUrls[i]["avatar_url"], "avatars/" + contribUrls[i]["login"] + ".png");
    }
  });
}

/* Download PNG images by URL to local folder */

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath)).on('close', function() {
    return ""
    });
  }



/* Request module to download PNG files */
// Need to iterate through the array and access the OBJECTS within the ARRAY

// var download = function(uri, filePath, _callback){
//   request.head(uri, function(err, res, body){
//     // console.log('content-type:', res.headers['content-type']);
//     // console.log('content-length:', res.headers['content-length']);

//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//   });
// };

// download.avatar_url, function(){
//   console.log('done');
// };


/* Test runner code */

  getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {
    console.log("Errors:", err);
    console.log("Result:", result);
  });