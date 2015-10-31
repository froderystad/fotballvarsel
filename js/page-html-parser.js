var cheerio = require('cheerio');
var crypto = require('crypto');

exports.parseArticles = function(htmlStr) {
  var $ = cheerio.load(htmlStr);

  var articles = [];

  var articleDivs = $('div .featured').each(function() {
    var article = {};
    article.title = $(this).find('h2').text();
    article.link = $(this).find('a').attr('href');
    article.id = findIdFromLink(article.link);
    article.hash = hash($(this).text());

    articles.push(article);
  });

  return articles;
}

var findIdFromLink = function(link) {
  var idStr = link.substring(link.lastIndexOf('=') + 1);
  return parseInt(idStr);
};

var hash = function(articleStr) {
  return crypto.createHash('md5').update(articleStr).digest('hex');
}