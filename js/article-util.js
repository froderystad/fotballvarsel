exports.findNew = function(freshArticles, knownArticles) {
  var newArticles = [];

  freshArticles.forEach(function(article) {
    if (!existsInArray(article, knownArticles, idComparator)) {
      newArticles.push(article);
    }
  });

  return newArticles;
};

var existsInArray = function(object, array, comparator) {
  for (i = 0; i < array.length; i++) {
    if (comparator(object, array[i])) {
      return true;
    }
  }
  return false;
};

exports.existsInArray = existsInArray;

var idComparator = function(a, b) {
  return a.id === b.id;
};

exports.articleComparator = idComparator;
