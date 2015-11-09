angular.module('app', ['ngRoute', 'ngResource'])

    .factory('Email', function() {
        return { email: null };
    })

    .factory('Subscriber', function(){
        return {
                "_id": "563f8556622a4f0c64b28cbb",
                "email": "frode.rystad@gmail.com",
                "teams": [
                    "G2009",
                    "G2007"
                ]
            };
    })

    .factory('Teams', ['$resource', function($resource){
        return $resource('/api/teams', null);
    }])

    .controller('LoginCtrl', ['$scope', '$location', 'Email', 'Subscriber', function ($scope, $location, Email, Subscriber) {
        $scope.email = Email;

        $scope.login = function() {
            console.log("%s logged in", $scope.email.email);
            console.log("Subscriber is %s", Subscriber.email);
            $location.path('/subscriber');
        };
    }])

    .controller('SubscriberCtrl', ['$scope', 'Subscriber', 'Teams', function ($scope, Subscriber, Teams) {
        $scope.subscriber = Subscriber;
        $scope.teams = Teams.query();
        console.log("Subscriber is %s", Subscriber.email);
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/login.html',
                controller: 'LoginCtrl'
            })

            .when('/subscriber', {
                templateUrl: '/subscriber.html',
                controller: 'SubscriberCtrl'
            });
    }]);
