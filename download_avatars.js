// Resolve necessary libraries (request, http, fs)

var request = require('request');
var http = require('http');
var fs = require('fs');

var sourceArgs = process.argv.slice(2);

// Confirm the arguments are properly returned without Node etc header info
// console.log(sourceArgs);

/* Define an Options variable that cites the correct API format and supplies a User-Agent ID */

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

    /* Download PNG images by URL to local folder // Request module to download PNG files */

    function downloadImageByURL(url, filePath) {
      request(url).pipe(fs.createWriteStream(filePath)).on('close', function() {
        return ""
      });
    }

    /* Test runner code */

    getRepoContributors("lighthouse-labs", "laser_shark", (err, result) => {
      console.log("Errors:", err);
      console.log("Result:", result);
    });