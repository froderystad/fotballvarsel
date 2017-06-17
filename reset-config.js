var repository = require('./js/repository.js');

var supportedTeams = [
  {
    'name': 'G2007',
    'url': 'http://skeid.no/portal/theme/team/main.do?teamId=10489',
  },
  {
    'name': 'G2009',
    'url': 'http://skeid.no/portal/theme/team/main.do?teamId=16047',
  }
];

repository.connect(function() {
  repository.replaceTeams(supportedTeams, function(error, teams) {
    console.log("Re-wrote configuration for " + teams.length + " teams");
    repository.deleteSubscribers(function(error, numDeleted) {
      console.log("Deleted " + numDeleted + " subscribers");
      repository.close();
    });
  });
});
                                                                                                             x
