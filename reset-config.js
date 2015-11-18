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

repository.replaceTeams(supportedTeams, function(error, teams) {
  console.log("Re-wrote configuration for " + teams.length + " teams");
});

var subscribers = [
  {
    'email': 'frode.rystad@gmail.com',
    'teams': ['G2009', 'G2007']
  }
];

repository.replaceSubscribers(subscribers, function(error, subscribers) {
  console.log("Re-wrote " + subscribers.length + " subscribers");
});
