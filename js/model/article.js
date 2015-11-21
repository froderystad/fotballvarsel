function Article(id, title, link, team) {
  this.id = id;
  this.title = title;
  this.link = link;
  this.team = team.name;
}

module.exports = Article;
