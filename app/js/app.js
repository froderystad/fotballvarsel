var app = angular.module('app', ['ngRoute', 'ngResource', 'controllers']);

app.factory('Email', function() {
    return { email: null };
});

app.factory('Subscriber', function(){
    return {
            "_id": "563f8556622a4f0c64b28cbb",
            "email": "frode.rystad@gmail.com",
            "teams": [
                "G2009",
                "G2007"
            ]
        };
});

app.factory('Teams', ['$resource', function($resource){
    return $resource('/api/teams', null);
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })

        .when('/subscriber', {
            templateUrl: 'partials/subscriber.html',
            controller: 'SubscriberCtrl'
        });
}]);
