var request = require('request');
var getKey = require('./secrets.js')

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  // console.log(result);
  for ( e of data) {
    console.log(e.avatar_url);
  }
});

