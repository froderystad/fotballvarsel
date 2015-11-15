var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var repository = require('./js/repository.js');

var port = process.env.PORT || 5000;
var router = express.Router();
var jsonParser = bodyParser.json();
//var multipartParser = bodyParser.urlencoded({ extended: true });

router.get('/', function (req, res) {
  res.json({message: 'Velkommen til Fotballvarsel for Skeid.no' });
});

router.route('/teams')
    .get(function(req, res) {
      repository.findAllTeams(function(error, teams) {
        res.json(teams);
      });
    });

router.route('/subscribers/:email')
    .get(function(req, res) {
      console.log("Getting subscriber " + req.params.email);
      repository.findSubscriberByEmail(req.params.email, function(err, subscriber) {
        if (err) {
          console.log("Error in repo: " + err);
          res.send(err);
        }
        console.log("Found " + subscriber);
        res.json(subscriber || {});
      });
    })
    .post(jsonParser, function(req, res) {
        var email = req.params.email;
        console.log("Inserting subscriber %s as %s", email, JSON.stringify(req.body));
        repository.insertOrUpdateSubscriber(email, req.body, function(err, status) {
            if (err) {
                console.log("Error in repo: " + err);
                res.send(err);
            }
            console.log("Inserted %s", email);
            res.json(status);
        })
    }).put(jsonParser, function(req, res) {
        var email = req.params.email;
        console.log("Updating subscriber %s to %s", email, JSON.stringify(req.body));
        repository.insertOrUpdateSubscriber(email, req.body, function(err, status) {
            if (err) {
                console.log("Error in repo: " + err);
                res.send(err);
            }
            console.log("Updated %s", email);
            res.json(status);
        })
    });

app.use('/api', router);

app.use(express.static(__dirname + '/app'));

app.listen(port);
console.log('Fotballvarsel listening on port %s', port);
