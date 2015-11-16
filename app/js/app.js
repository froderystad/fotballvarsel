var app = angular.module('app', ['ngRoute', 'ngResource', 'controllers', 'services']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html',
            controller: 'WelcomeCtrl'
        })

        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })

        .when('/loginByLink/:email', {
            templateUrl: 'partials/loginByLink.html',
            controller: 'LoginByLinkCtrl'
        })

        .when('/subscriber', {
            templateUrl: 'partials/subscriber.html',
            controller: 'SubscriberCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
}]);
