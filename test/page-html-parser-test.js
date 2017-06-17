var assert = require('chai').assert;
var expect = require('chai').expect;
var fs = require('fs');
var parser = require('../js/page-html-parser.js');
var articleUtil = require('../js/article-util.js');

var isNan = function(number) {
    return number !== number;
};

describe('Page HTML Parser', function() {
  describe('#parseArticles()', function () {
    var articles = parser.parseArticles('Boys', fs.readFileSync('./test/source-base.html', 'utf-8'));
    it('should return correct number of articles', function () {
      assert.equal(8, articles.length);
    });
    it('should have a title', function () {
      assert.notEqual(undefined, articles[0].title);
    });
    it('should have a link', function () {
      assert.notEqual(undefined, articles[0].link);
    });
    it('should have an id', function () {
      articles.forEach(function(article) {
        assert.isFalse(isNan(article.id), "Article " + article.title + " has no ID");
      });
    });
    it('should have a team', function () {
      assert.equal('Boys', articles[0].teamName);
    });
  });

  describe('Integration test which finds new articles', function() {
    var knownArticles = parser.parseArticles('Boys', fs.readFileSync('./test/source-base.html', 'utf-8'));
    var freshArticles = parser.parseArticles('Boys', fs.readFileSync('./test/source-change.html', 'utf-8'));

    it('finds the new articles', function() {
      var articleDiff = articleUtil.findDiff(freshArticles, knownArticles);
        expect(articleDiff.created).to.have.length(1);
        expect(articleDiff.updated).to.have.length(1);
    });
  });
});
