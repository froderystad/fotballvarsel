var mongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;

var db;

exports.connect = function(callback) {
  mongoClient.connect(mongoUrl, function(error, mongoDb) {
    if (error) {
      console.log(JSON.stringify(error));
      return;
    }
    db = mongoDb;

    if (callback) {
      callback();
    }
  });
};

exports.close = function() {
  console.log("Closing database connection");
  db.close();
};

exports.findAllTeams = function(callback) {
  findAll("teams", callback);
};

exports.findAllArticles = function(callback) {
  findAll("articles", callback);
};

var findAll = function(collectionName, callback) {
  var collection = db.collection(collectionName);
  collection.find({}).toArray(function(error, items) {
    callback(error, items || []);
  });
};

exports.insertArticles = function(articles, callback) {
  if (articles.length === 0) {
    callback(undefined, articles);
    return;
  }
  
  var collection = db.collection('articles');
  collection.insertMany(articles, function(error, result) {
    if (error) console.log("insertMany error: " + error);
    callback(error, result.ops);
  });
};

exports.findSubscriberByEmail = function(email, callback) {
  var collection = db.collection('subscribers');
  collection.findOne({ email: email }, function(error, subscriber) {
    if (error) console.log("findOne error: " + error);
    callback(error, subscriber);
  });
};

exports.insertSubscriber = function(subscriber, callback) {
  delete subscriber._id;
  var collection = db.collection('subscribers');
  collection.insertOne(subscriber, function(error, subscriber) {
    if (error) console.log("insertOne error: " + error);
    callback(error, subscriber);
  });
};

exports.updateSubscriber = function(email, secret, subscriber, callback) {
  delete subscriber._id;
  var collection = db.collection('subscribers');
  collection.updateOne({email: email, secret: secret}, subscriber, function(error, subscriber) {
    if (error) console.log("updateOne error: " + error);
    callback(error, subscriber);
  });
};

exports.findSubscribersForTeam = function(team, callback) {
  var collection = db.collection('subscribers');
  collection.find({ teams: { $in: [team.name] } }).toArray(function(error, subscribers) {
    if (error) console.log("find error: " + error);
    callback(error, subscribers);
  });
};

exports.replaceTeams = function(teams, callback) {
  var collection = db.collection("teams");
  collection.deleteMany({}, function(error, result) {
    if (error) {
      console.log("deleteMany error: " + error);
      return callback(error, undefined);
    }
    collection.insertMany(teams, function(error, result) {
      if (error) console.log("insertMany error: " + error);
      callback(error, result.ops);
    });
  });
};

exports.deleteSubscribers = function(callback) {
  var collection = db.collection("subscribers");
  collection.deleteMany({}, function (error, result) {
    if (error) console.log("deleteMany error: " + error);
    return callback(error, result.deletedCount);
  });
};
