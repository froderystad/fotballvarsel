var controllers = angular.module('controllers', ['services', 'ngRoute']);

controllers.controller('RegisterCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.register = function(email) {
        $scope.success = null;
        $scope.error = null;

        $http.post('/api/newsecret', {email: email}, {headers: {'Content-Type': "application/json"}
        }).then(function(response) {
            console.log("Request succeeded: %s", JSON.stringify(response));
            if (response.data.status == 'ok') {
                $scope.success = "Registreringen var vellykket. Sjekk din e-postkasse!";
            } else {
                $scope.error = "Registreringen feilet!";
            }
        }, function(response) {
            console.log("Request failed: %s", JSON.stringify(response));
            $scope.error = "Registreringen feilet!";
        });
    };
}]);

controllers.controller('LoginCtrl', ['$scope', '$location', 'Subscribers', 'Subscriber', function ($scope, $location, Subscribers, Subscriber) {
    $scope.login = function(email, secret) {
        $scope.error = null;

        Subscribers.get({email: email, secret: secret}, function(subscriber) {
            if (subscriber.email) {
                console.log("%s logged in as %s", email, JSON.stringify(subscriber));
                Subscriber.theSubscriber = subscriber;
                $location.path('/subscriber');
            } else {
                console.log("%s is unknown", email);
                $scope.error = "Ukjent e-postadresse";
            }
        }, function(response) {
            console.log("Request failed: %s", JSON.stringify(response));
            $scope.error = "En uventet feil skjedde";
        });
    };
}]);

controllers.controller('LoginByLinkCtrl', ['$scope', '$location', '$routeParams', 'Subscribers', 'Subscriber', function ($scope, $location, $routeParams, Subscribers, Subscriber) {
    console.log("Trying to log in %s with secret in link", $routeParams.email);
    var email = $routeParams.email;
    var secret = $routeParams.secret;

    Subscribers.get({email: email, secret: secret}, function(subscriber) {
        if (subscriber.email) {
            console.log("%s logged in as %s", email, JSON.stringify(subscriber));
            Subscriber.theSubscriber = subscriber;
            $location.path('/subscriber');
            $location.search({});
        } else {
            console.log("%s is unknown", email);
            $scope.error = "Ukjent e-postadresse";
        }
    }, function(response) {
        console.log("Request failed: %s", JSON.stringify(response));
        $scope.error = "En uventet feil skjedde";
    });
}]);

controllers.controller('SubscriberCtrl', ['$scope', '$location', 'Subscriber', 'Subscribers', 'Teams', function ($scope, $location, Subscriber, Subscribers, Teams) {
    $scope.subscriber = Subscriber.theSubscriber;

    if (!$scope.subscriber.email) {
        $location.path('/');
        return;
    }

    $scope.teams = Teams.query();
    console.log("Subscriber is %s", $scope.subscriber.email);

    $scope.subscribes = function(team) {
        var subscribedTeams = $scope.subscriber.teams;
        if (subscribedTeams) {
            return subscribedTeams.some(function (aTeamName) {
                return aTeamName == team.name;
            });
        } else {
            return false;
        }
    };

    var subscribe = function(team) {
        $scope.subscriber.teams.push(team.name);
        Subscribers.update({email: $scope.subscriber.email, secret: $scope.subscriber.secret}, $scope.subscriber, function(result) {
            if (result && result.ok == 1) {
                console.log("Subscribed to %s", team.name);
                $scope.success = "Du abonnerer nå på " + team.name;
            } else {
                console.log("Subscriber update failed: %s", JSON.stringify(response));
                $scope.error = "Oppdateringen feilet! Prøv igjen senere.";
            }
        }, function(response) {
            console.log("Subscriber update failed: %s", JSON.stringify(response));
            $scope.error = "Oppdateringen feilet! Prøv igjen senere.";
        });
    };

    var unsubscribe = function(team) {
        var teamNames = $scope.subscriber.teams;
        var i = function(team) {
            for (i = 0; i < teamNames.length; i++) {
                if (teamNames[i] == team.name) {
                    console.log("Found %s in index %d", team.name, i);
                    return i;
                }
            }
            return -1;
        }(team);
        if (i > -1) {
            $scope.subscriber.teams.splice(i, 1);
            Subscribers.update({email: $scope.subscriber.email, secret: $scope.subscriber.secret}, $scope.subscriber, function(result) {
                if (result && result.ok == 1) {
                    console.log("Unsubscribed to %s", team.name);
                    $scope.success = "Du abonnerer ikke lenger på " + team.name;
                } else {
                    console.log("Subscriber update failed: %s", JSON.stringify(response));
                    $scope.error = "Oppdateringen feilet! Prøv igjen senere.";
                }
            }, function(response) {
                console.log("Subscriber update failed: %s", JSON.stringify(response));
                $scope.error = "Oppdateringen feilet! Prøv igjen senere.";
            });
        }
    };

    $scope.subscriptionChanged = function(team) {
        $scope.success = null;
        $scope.error = null;

        console.log("Subscription changed");
        if ($scope.subscribes(team)) {
            unsubscribe(team);
        } else {
            subscribe(team);
        }
    };
}]);

controllers.controller('WelcomeCtrl', ['$scope', 'Teams', function($scope, Teams) {
    $scope.teams = Teams.query();
}]);


