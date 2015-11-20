/*jshint expr: true*/

var expect = require('chai').expect;
var articleUtil = require('../js/article-util.js');
var comp = articleUtil.articleComparator;
var Article = require('../js/model/article.js');

var article1 = new Article(1, "Title 1", "http://foo.org");
var article2 = new Article(2, "Title 2", "http://bar.org");
var articles = [ article1, article2 ];

describe('Article utility', function() {
  describe('When all articles are new', function () {
    it('returns all articles', function () {
      expect(articleUtil.findNew(articles, [])).to.deep.equal(articles);
    });
  });

  describe('When no articles are new', function () {
    it('returns no articles', function () {
      expect(articleUtil.findNew(articles, articles)).to.deep.equal([]);
    });
  });

  describe('When one article is new', function() {
    it('returns the new article', function() {
        expect(articleUtil.findNew(articles, articles.slice(0, 1))).to.deep.equal([article2]);
    });
  });
});

describe('Array finder', function() {
  it('Finds element in array', function() {
    var existingArticle = new Article(1, "Title 1", "http://foo.org");
    expect(articleUtil.existsInArray(existingArticle, articles, comp)).to.be.true;
  });
  it('Reports elements not found', function() {
    var newArticle = new Article(3, "Title 3", "http://baz.org");
    expect(articleUtil.existsInArray(newArticle, articles, comp)).to.be.false;
  });
});
