// for each monitored page
//   get articles from web page
//   get last known articles from data store
//   identify new/changed articles
//   get subscribers to page
//   notify subscribers to page

var request = require('request');
var parser = require('./page-html-parser.js');
var articleUtil = require('./article-util.js');
var repository = require('./repository.js');

exports.execute = function() {
  repository.findAllTeams(function(teams) {
    teams.forEach(function(team, index, array) {
      requestBody(team, handleResponseBody);
    });
  });
};

var requestBody = function(team, bodyHandler) {
  request(team.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyHandler(team, body);
    } else {
      console.log("Failed fetching " + team.url);
    }
  });
};

var handleResponseBody = function(team, body) {
  var freshArticles = parser.parseArticles(body);
  console.log("Read %d articles for %s", freshArticles.length, team.name);

  var knownArticles = repository.findAllArticles(function(error, articles) {
    var newOrChangedArticles = articleUtil.findNewOrChanged(freshArticles, knownArticles);
  });
};