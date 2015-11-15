var app = angular.module('app', ['ngRoute', 'ngResource', 'controllers', 'services']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/welcome', {
            templateUrl: 'partials/welcome.html'
        })

        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })

        .when('/subscriber', {
            templateUrl: 'partials/subscriber.html',
            controller: 'SubscriberCtrl'
        })

        .otherwise({
            redirectTo: '/welcome'
        });
}]);
