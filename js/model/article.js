var crypto = require('crypto');

function Article(id, title, link, hash) {
  this.id = id;
  this.title = title;
  this.link = link;
  this.hash = computeHash("" + id + title + link);
}

var computeHash = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

module.exports = Article;