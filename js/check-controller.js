// for each monitored page
//   get articles from web page
//   get last known articles from data store
//   identify new/changed articles
//   get subscribers to page
//   notify subscribers to page

var request = require('request');
var parser = require('./page-html-parser.js');
var articleUtil = require('./article-util.js');

exports.execute = function() {
  var url = 'http://skeid.no/portal/theme/team/main.do?teamId=10489';
  requestBody(url, handleResponseBody);
};

var requestBody = function(url, bodyHandler) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyHandler(body);
    } else {
      console.log("Failed fetching " + url);
    }
  });
}

var handleResponseBody = function(body) {
  var freshArticles = parser.parseArticles(body);
  console.log("Found " + freshArticles.length + " articles");

  var knownArticles = [];
  var newOrChangedArticles = articleUtil.findNewOrChanged(freshArticles, knownArticles);
}