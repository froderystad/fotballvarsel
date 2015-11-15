var controllers = angular.module('controllers', ['services']);

controllers.controller('LoginCtrl', ['$scope', '$location', 'Email', 'Subscribers', 'Subscriber', function ($scope, $location, Email, Subscribers, Subscriber) {
    $scope.email = Email;
    $scope.error = null;

    $scope.login = function() {
        var email = $scope.email.email;
        $scope.error = null;

        if (!email) {
            $scope.error = "Ikke en e-postadresse";
            $location.path('/login');
            return;
        }

        Subscribers.get({email: email}, function(subscriber) {
            if (subscriber.email) {
                console.log("%s logged in as %s", email, JSON.stringify(subscriber));
                Subscriber.theSubscriber = subscriber;
                $location.path('/subscriber');
            } else {
                console.log("%s is unknown", email);
                $scope.error = "Ukjent e-postadresse";
                $location.path('/login');
            }
        }, function(response) {
            console.log("Request failed: %s", JSON.stringify(response));
            $scope.error = "En uventet feil skjedde";
            $location.path('/login');
        });
    };
}]);

controllers.controller('SubscriberCtrl', ['$scope', 'Subscriber', 'Subscribers', 'Teams', function ($scope, Subscriber, Subscribers, Teams) {
    $scope.subscriber = Subscriber.theSubscriber;

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
        Subscribers.update({email: $scope.subscriber.email}, $scope.subscriber);
        console.log("Subscribed to %s", team.name);
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
            Subscribers.update({email: $scope.subscriber.email}, $scope.subscriber);
            console.log("Unsubscribed to %s", team.name);
        }
    };

    $scope.subscriptionChanged = function(team) {
        console.log("Subscription changed");
        if ($scope.subscribes(team)) {
            unsubscribe(team);
        } else {
            subscribe(team);
        }
    };
}]);


