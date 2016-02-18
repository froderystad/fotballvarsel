var request = require('request');
var parser = require('./page-html-parser.js');
var articleUtil = require('./article-util.js');
var repository = require('./repository.js');
var mailSender = require('./mail-sender.js');
var iconvLite = require('iconv-lite');

var numTeams;
var numTeamsDone = 0;

exports.execute = function() {
  repository.connect(function() {
    repository.findAllTeams(function (error, teams) {
      numTeams = teams.length;
      teams.forEach(function (team, index, array) {
        requestBody(team, handleResponseBody);
      });
    });
  });
};

var requestBody = function(team, handleResponseBody) {
  request({ uri: team.url, encoding: 'binary', timeout: 15000}, function (error, response, binaryBody) {
    if (!error && response.statusCode == 200) {
      handleResponseBody(team, decodeBody(binaryBody));
    } else {
      console.error("Failed fetching " + team.url, error);
    }
  });
};

var decodeBody = function(binaryBody) {
  var bodyBuffer = new Buffer(binaryBody, 'binary');
  return iconvLite.decode(bodyBuffer, 'iso-8859-1');
};

var handleResponseBody = function(team, body) {
  var freshArticles = parser.parseArticles(team.name, body);
  console.log("Read %d articles for %s from web", freshArticles.length, team.name);

  repository.findAllArticlesForTeam(team.name, function(error, knownArticles) {
    var articleStatus = articleUtil.findDiff(freshArticles, knownArticles);
    deleteUpdatedArticles(team, articleStatus); // simple solution that avoids updates
  });
};

var deleteUpdatedArticles = function(team, articleStatus) {
  if (articleStatus.updated.length > 0) {
    repository.deleteArticles(articleStatus.updated, function (error, deletedCount) {
      var newArticles = articleStatus.created.concat(articleStatus.updated);
      saveNewArticles(team, newArticles);
    });
  } else {
    saveNewArticles(team, articleStatus.created);
  }
};

var saveNewArticles = function(team, newArticles) {
  repository.insertArticles(newArticles, function(error, insertedArticles) {
    var numInserted = insertedArticles.length;
    if (numInserted > 0) console.log("Found %d new articles for %s", numInserted, team.name);
    alertSubscribers(team, newArticles);
  });
};

var alertSubscribers = function(team, newArticles) {
  if (newArticles.length === 0) {
    informDone(team);
    return;
  }

  repository.findSubscribersForTeam(team, function(error, subscribers) {
    if (error) console.error("Error finding subscribers for team %s", team.name);
    console.log("Alerting %d subscribers for %s", subscribers.length, team.name);
    subscribers.forEach(function(subscriber) {
      console.log("Sending e-mail to %s about %d new articles for %s", subscriber.email, newArticles.length, team.name);
      mailSender.sendEmail(subscriber, team, newArticles);
    });
    informDone(team);
  });
};

var informDone = function(team) {
  numTeamsDone++;
  console.log("Done checking %s", team.name);

  if (numTeamsDone == numTeams) {
    repository.close();
  }
};

