var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var repository = require('./js/repository.js');
var secretGenerator = require('./js/secret-generator.js');
var mailSender = require('./js/mail-sender.js');

var port = process.env.PORT || 5000;
var router = express.Router();
var jsonParser = bodyParser.json();

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

        if (!email) {
            return res.json({
                status: "error"
            });
        }

        repository.findSubscriberByEmail(email, function(error, subscriber) {
            if (subscriber) {
                console.log("Issuing new secret for %s", email);
                subscriber.secret = secret;
                repository.updateSubscriber(email, subscriber.secret, subscriber, function(error, result) {
                    if (error) {
                        res.json({
                            email: subscriber.email,
                            status: "error"
                        });
                    } else {
                        sendEmailAndRespond(subscriber, res);
                    }
                });
            } else {
                console.log("Registering new subscriber %s", email);
                var newSubscriber = {
                    email: email,
                    secret: secret,
                    teams: []
                };
                repository.insertSubscriber(newSubscriber, function(error, result) {
                    if (error) {
                        res.json({
                            email: newSubscriber.email,
                            status: "error"
                        });
                    } else {
                        sendEmailAndRespond(newSubscriber, res);
                    }
                })
            }
        });
    });

var sendEmailAndRespond = function(subscriber, res) {
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
};

router.route('/subscribers/:email')
    .get(function(req, res) {
      repository.findSubscriberByEmail(req.params.email, function(err, subscriber) {
        if (err) {
          console.log("Error in repo: " + err);
          res.send(err);
        }
        res.json(subscriber || {});
      });
    })
    .put(jsonParser, function(req, res) {
        var email = req.params.email;
        var secret = req.body.secret;

        if (!email || ! secret) {
            return res.json({
                email: subscriber.email,
                status: "error"
            });
        }

        console.log("Updating subscriber %s to %s", email, JSON.stringify(req.body));
        repository.updateSubscriber(email, secret, req.body, function(err, status) {
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
