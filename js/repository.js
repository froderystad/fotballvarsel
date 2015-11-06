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
  mongoClient.connect(url, function(err, db) {
    if (err) console.log("Error: " + err);
    var collection = db.collection("teams");
    collection.deleteMany({}, function(error, result) {
      if (error) console.log("Error: " + error);
      console.log("Deleted " + result.deletedCount + " team entries");

      collection.insertMany(teams, function(error, result) {
        if (error) console.log("Error: " + error);
        console.log("Inserted " + result.insertedCount + " team configurations");
        db.close();
        successCallback(result.ops);
      });
    });
  });
};

exports.replaceSubscribers = function(subscribers, successCallback) {
  mongoClient.connect(url, function(error, db) {
    if (error) console.log("connect error: " + error);
    var collection = db.collection("subscribers");
    collection.deleteMany({}, function(error, result) {
      if (error) console.log("deleteMany error: " + error);
      collection.insertMany(subscribers, function(error, result) {
        if (error) console.log("insertMany error: " + error);
        db.close();
        successCallback(result.ops);
      });
    });
  });
};