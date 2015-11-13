var services = angular.module('services', ['ngResource']);

services.factory('Email', function() {
    return { email: null };
});

services.factory('Subscriber', function(){
    return {
        "_id": "563f8556622a4f0c64b28cbb",
        "email": "frode.rystad@gmail.com",
        "teams": [
            "G2009",
            "G2007"
        ]
    };
});

services.factory('Teams', ['$resource', function($resource){
    return $resource('/api/teams', null);
}]);
