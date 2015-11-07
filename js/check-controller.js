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
  repository.findAllTeams(function(error, teams) {
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
  console.log("Read %d articles for %s from web", freshArticles.length, team.name);

  var knownArticles = repository.findAllArticles(function(error, knownArticles) {
    var newArticles = articleUtil.findNew(freshArticles, knownArticles);
    saveNewArticles(team, newArticles, alertSubscribers);
  });
};

var saveNewArticles = function(team, newArticles, alertSubscribers) {
  repository.insertArticles(newArticles, function(error, insertedArticles) {
    var numInserted = insertedArticles.length;
    if (numInserted > 0) console.log("Found %d new articles for %s", numInserted, team.name);
    alertSubscribers(team, newArticles, informDone);
  });
};

var alertSubscribers = function(team, newArticles, informDone) {
  if (newArticles.length === 0) {
    informDone(team);
    return;
  }

  repository.findSubscribersForTeam(team, function(error, subscribers) {
    if (error) console.log("Error finding subscribers for team %s", team.name);
    console.log("Alerting %d subscribers for %s", subscribers.length, team.name);
    subscribers.forEach(function(subscriber) {
      console.log("Sending e-mail to %s about %d new articles for %s", subscriber.email, newArticles.length, team.name);
    });
    informDone(team);
  });
};

var informDone = function(team) {
  console.log("Done checking %s", team.name);
};

