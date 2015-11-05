var collections = ["portals", "subscribers"];
var db = require("mongojs").connect(process.env.MONGOLAB_URI, collections);

exports.findAllPortals = function(handleFoundPortals) {
  db.portals.find(function(err, portals) {
    if( err || !portals) console.log("No portals found");
    else handleFoundPortals(portals);
  });
};

exports.replacePortals = function(supportedPortals) {
  //db.portals.deleteMany();
};