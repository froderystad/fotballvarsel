//var collections = ["portals", "subscribers"];
var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

exports.findAllPortals = function(handleFoundPortals) {
  mongoClient.connect(url, function(err, db) {
    if (err) console.log("Error: " + err);
    var collection = db.collection("portals");
    collection.find({}).toArray(function(err, items) {
      handleFoundPortals(items || []);
    });
    db.close();
  });
};

exports.replacePortals = function(supportedPortals) {
  //db.portals.deleteMany();
};