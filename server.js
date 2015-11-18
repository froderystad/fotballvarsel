var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var repository = require('./js/repository.js');
var secretGenerator = require('./js/secret-generator.js');
var mailSender = require('./js/mail-sender.js');

var port = process.env.PORT || 5000;
var router = express.Router();
var jsonParser = bodyParser.json();

router.get('/', function (req, res) {
  res.json({message: 'Velkommen til Fotballvarsel for Skeid.no' });
});

router.route('/teams')
    .get(function(req, res) {
      repository.findAllTeams(function(error, teams) {
        res.json(teams);
      });
    });

router.route('/newsecret')
    .post(jsonParser, function(req, res) {
        var email = req.body.email;
        var secret = secretGenerator.newSecret();

        repository.findSubscriberByEmail(email, function(error, subscriber) {
            if (subscriber) {
                console.log("Issuing new secret for %s", email);
                subscriber.secret = secret;
                updateSubscriberAndSendEmail(subscriber, res);
            } else {
                console.log("Registering new subscriber %s", email);
                var newSubscriber = {
                    email: email,
                    secret: secret,
                    teams: []
                };
                updateSubscriberAndSendEmail(newSubscriber, res);
            }
        });
    });

var updateSubscriberAndSendEmail = function(subscriber, res) {
    repository.insertOrUpdateSubscriber(subscriber.email, subscriber, function(error, result) {
        mailSender.newSecret(subscriber, function(error, result) {
            if (error) {
                console.log("Error sending email: %s", JSON.stringify(error));
                res.json({
                    email: subscriber.email,
                    status: "error"
                });
            } else {
                res.json({
                    email: subscriber.email,
                    status: "ok"
                });
            }
        });
    })
};

router.route('/subscribers/:email')
    .get(function(req, res) {
      console.log("Getting subscriber " + req.params.email);
      repository.findSubscriberByEmail(req.params.email, function(err, subscriber) {
        if (err) {
          console.log("Error in repo: " + err);
          res.send(err);
        }
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
