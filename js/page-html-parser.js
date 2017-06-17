var cheerio = require('cheerio');
var Article = require('./model/article.js');

var urlPrefix = 'http://skeid.no';

exports.parseArticles = function(teamName, htmlStr) {
  var $ = cheerio.load(htmlStr);

  var articles = [];

  $('div .item .w-box').each(function() {
    var title = $(this).find('h2').text();
    var link = urlPrefix + $(this).find('.w-footer a').attr('href');
    var id = findIdFromLink(link);

    var article = new Article(id, title, link, teamName);
    articles.push(article);
  });

  return articles;
};

var findIdFromLink = function(link) {
  var idStr = link.substring(link.lastIndexOf('=') + 1);
  return parseInt(idStr);
};
