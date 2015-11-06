//var collections = ["portals", "subscribers"];
var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

exports.findAllTeams = function(successCallback) {
  mongoClient.connect(url, function(error, db) {
    if (error) console.log("Error: " + error);
    var collection = db.collection("teams");
    collection.find({}).toArray(function(error, items) {
      db.close();
      successCallback(items || []);
    });
  });
};

exports.replaceTeams = function(teams, successCallback) {
  deleteAndInsertMany("teams", teams, successCallback);
};

exports.replaceSubscribers = function(subscribers, successCallback) {
  deleteAndInsertMany("subscribers", subscribers, successCallback);
};

var deleteAndInsertMany = function(collectionName, items, successCallback) {
  mongoClient.connect(url, function(error, db) {
    if (error) console.log("connect error: " + error);
    var collection = db.collection(collectionName);
    collection.deleteMany({}, function(error, result) {
      if (error) console.log("deleteMany error: " + error);
      collection.insertMany(items, function(error, result) {
        if (error) console.log("insertMany error: " + error);
        db.close();
        successCallback(result.ops);
      });
    });
  });
}