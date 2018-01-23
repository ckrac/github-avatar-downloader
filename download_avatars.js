var request = require('request');
var getKey = require('./secrets.js');
var fs = require('fs');
var owner = process.argv[2]
var name = process.argv[3]
console.log(`owner: ${owner} repo: ${name}`);


// console.log('Welcome to the GitHub Avatar Downloader!');
// console.log(getKey.GITHUB_TOKEN);

function getRepoContributors(repoOwner, repoName, cb) {

// if statement to check if user have the required arguments on node
  if(repoOwner && repoName) {

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

  } else {
    console.log("Error: Please add your repoOwner and repoName to node.");
  }

}


// function to use as call back to pipe recieved url to a folder
function downloadImageByURL(url, filePath) {

  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));

}

getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  // console.log(result);
  for (e of data) {
    // console.log(e);
    downloadImageByURL(e.avatar_url, './avatars/avatar' + e.login + ".jpg")
  }
});







