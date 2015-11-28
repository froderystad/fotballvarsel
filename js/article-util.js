exports.findDiff = function(freshArticles, knownArticles) {
  var articleStatus = {
    created:[],
    updated: []
  };

  freshArticles.forEach(function(article) {
    if (existsInArray(article, knownArticles, comparator)) {
      if (isUpdate(article, knownArticles)) {
        articleStatus.updated.push(article);
      }
    } else {
      articleStatus.created.push(article);
    }
  });

  return articleStatus;
};

var existsInArray = function(object, array, comparator) {
  for (i = 0; i < array.length; i++) {
    if (comparator(object, array[i])) {
      return true;
    }
  }
  return false;
};

var isUpdate = function(article, knownArticles) {
  var articleHash = article.hash();
  for (i = 0; i < knownArticles.length; i++) {
    var other = knownArticles[i];
    if (article.id === other.id && article.teamName === other.teamName && articleHash != other.hash()) {
      console.log("Article %d is updated", article.id);
      return true;
    }
  }
  return false;
};

exports.existsInArray = existsInArray;

var comparator = function(a, b) {
  return a.id === b.id && a.teamName == b.teamName;
};

exports.articleComparator = comparator;
