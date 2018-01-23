var request = require('request');
var getKey = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

// console.log(getKey.GITHUB_TOKEN);


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' +  getKey.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  // ...

  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  // console.log(result);
  for (e of data) {
    // console.log(e);
    downloadImageByURL(e.avatar_url, './avatars/avatar' + e.login + ".jpg")
  }
});







