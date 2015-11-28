var crypto = require('crypto');

function Article(id, title, link, teamName) {
  this.id = id;
  this.title = title;
  this.link = link;
  this.teamName = teamName;
}

Article.prototype.hash = function() {
  var str = "" + this.id + this.title + this.teamName;
  return crypto.createHash('md5').update(str).digest('hex');
};

module.exports = Article;
