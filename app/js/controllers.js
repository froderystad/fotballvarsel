var controllers = angular.module('controllers', []);

controllers.controller('LoginCtrl', ['$scope', '$location', 'Email', 'Subscriber', function ($scope, $location, Email, Subscriber) {
    $scope.email = Email;

    $scope.login = function() {
        console.log("%s logged in", $scope.email.email);
        console.log("Subscriber is %s", Subscriber.email);
        $location.path('/subscriber');
    };
}]);

controllers.controller('SubscriberCtrl', ['$scope', 'Subscriber', 'Teams', function ($scope, Subscriber, Teams) {
    $scope.subscriber = Subscriber;
    $scope.teams = Teams.query();
    console.log("Subscriber is %s", Subscriber.email);
}]);


