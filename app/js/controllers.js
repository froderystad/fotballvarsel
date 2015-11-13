var controllers = angular.module('controllers', []);

controllers.controller('LoginCtrl', ['$scope', '$location', 'Subscribers', 'Subscriber', function ($scope, $location, Subscribers, Subscriber) {
    $scope.email = null;

    $scope.login = function() {
        var email = $scope.email;
        console.log("%s logged in", email);
        Subscribers.get({email: email}, function(subscriber) {
            Subscriber.theSubscriber = subscriber;
            console.log("Subscriber is %s", subscriber.email);
            $location.path('/subscriber');
        });
    };
}]);

controllers.controller('SubscriberCtrl', ['$scope', 'Subscriber', 'Teams', function ($scope, Subscriber, Teams) {
    $scope.subscriber = Subscriber.theSubscriber;
    $scope.teams = Teams.query();
    console.log("Subscriber is %s", $scope.subscriber.email);
}]);


