/*jshint expr: true*/

var expect = require('chai').expect;
var articleUtil = require('../js/article-util.js');
var comp = articleUtil.hashComparator;
var Article = require('../js/model/article.js');

var articles = [
    new Article(1, "Title 1", "http://foo.org"),
    new Article(2, "Title 2", "http://bar.org")
  ];

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