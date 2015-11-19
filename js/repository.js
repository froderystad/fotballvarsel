var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

exports.findAllTeams = function(callback) {
  findAll("teams", callback);
};

exports.findAllArticles = function(callback) {
  findAll("articles", callback);
};

var findAll = function(collectionName, callback) {
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection(collectionName);
    collection.find({}).toArray(function(error, items) {
      db.close();
      callback(error, items || []);
    });
  });
};

exports.insertArticles = function(articles, callback) {
  if (articles.length === 0) {
    callback(undefined, articles);
    return;
  }
  
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection('articles');
    collection.insertMany(articles, function(error, result) {
      if (error) console.log("insertMany error: " + error);
      db.close();
      callback(error, result.ops);
    });
  });
};

exports.findSubscriberByEmail = function(email, callback) {
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection('subscribers');
    collection.findOne({ email: email }, function(error, subscriber) {
      if (error) console.log("findOne error: " + error);
      db.close();
      callback(error, subscriber);
    });
  });
};

exports.insertSubscriber = function(subscriber, callback) {
  delete subscriber._id;
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection('subscribers');
    collection.insertOne(subscriber, function(error, subscriber) {
      if (error) console.log("insertOne error: " + error);
      db.close();
      callback(error, subscriber);
    });
  });
};

exports.updateSubscriber = function(email, secret, subscriber, callback) {
  delete subscriber._id;
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection('subscribers');
    collection.updateOne({email: email, secret: secret}, subscriber, function(error, subscriber) {
      if (error) console.log("updateOne error: " + error);
      db.close();
      callback(error, subscriber);
    });
  });
};

exports.findSubscribersForTeam = function(team, callback) {
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection('subscribers');
    collection.find({ teams: { $in: [team.name] } }).toArray(function(error, subscribers) {
      if (error) console.log("find error: " + error);
      db.close();
      callback(error, subscribers);
    });
  });
};

exports.replaceTeams = function(teams, callback) {
  deleteAndInsertMany("teams", teams, callback);
};

exports.deleteSubscribers = function(callback) {
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection("subscribers");
    collection.deleteMany({}, function (error, result) {
      if (error) console.log("deleteMany error: " + error);
      db.close();
      return callback(error, result.deletedCount);
    });
  });
};

var deleteAndInsertMany = function(collectionName, items, callback) {
  mongoClient.connect(url, function(error, db) {
    if (error) return callback(error, undefined);
    var collection = db.collection(collectionName);
    collection.deleteMany({}, function(error, result) {
      if (error) {
        console.log("deleteMany error: " + error);
        d.close();
        return callback(error, undefined);
      }
      collection.insertMany(items, function(error, result) {
        if (error) console.log("insertMany error: " + error);
        db.close();
        callback(error, result.ops);
      });
    });
  });
};
