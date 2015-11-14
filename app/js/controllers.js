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

controllers.controller('SubscriberCtrl', ['$scope', 'Subscriber', 'Teams', function ($scope, Subscriber, Teams) {
    $scope.subscriber = Subscriber.theSubscriber;

    $scope.teams = Teams.query();
    console.log("Subscriber is %s", $scope.subscriber.email);
}]);


