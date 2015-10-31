var assert = require('chai').assert;
var fs = require('fs');
var parser = require('../js/page-html-parser.js');

describe('Page HTML Parser', function() {
  describe('#parseArticles()', function () {
    var articles = parser.parseArticles(fs.readFileSync('./test/source-base-g07.html', 'utf-8'));
    it('should return correct number of articles', function () {
      assert.equal(6, articles.length);
    });
    it('should have a title', function () {
      assert.notEqual(undefined, articles[0].title);
    });
    it('should have a link', function () {
      assert.notEqual(undefined, articles[0].link);
    });
    it('should have an id', function () {
      assert.isNumber(articles[0].id);
    });
  });
});