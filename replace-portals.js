var repository = require('./js/repository.js');

//repository.replacePortals(function(portals) {
//  console.log("Replaced " + portals.lenght + " portals");
//});

repository.findAllPortals(function(portals) {
  console.log("Found " + portals.lenght + " portals");
});

