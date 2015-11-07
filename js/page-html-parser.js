var cheerio = require('cheerio');
var Article = require('./model/article.js');

exports.parseArticles = function(htmlStr) {
  var $ = cheerio.load(htmlStr);

  var articles = [];

  var articleDivs = $('div .featured').each(function() {
    var title = $(this).find('h2').text();
    var link = $(this).find('a').attr('href');
    var id = findIdFromLink(link);

    var article = new Article(id, title, link);
    articles.push(article);
  });

  return articles;
};

var findIdFromLink = function(link) {
  var idStr = link.substring(link.lastIndexOf('=') + 1);
  return parseInt(idStr);
};