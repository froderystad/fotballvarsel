var cheerio = require('cheerio');

exports.parseArticles = function(htmlStr) {
  var $ = cheerio.load(htmlStr);

  var articles = [];

  var articleDivs = $('div .featured').each(function() {
    var article = {};
    article.title = $(this).find('h2').text();
    article.link = $(this).find('a').attr('href');
    article.id = findIdFromLink(article.link);

    articles.push(article);
  });

  return articles;
}

var findIdFromLink = function(link) {
  var idStr = link.substring(link.lastIndexOf('=') + 1);
  return parseInt(idStr);
};