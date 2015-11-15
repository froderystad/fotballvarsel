var services = angular.module('services', ['ngResource']);

services.factory('Email', function() {
    var state = {};
    return { theEmail: state };
});

services.factory('Subscriber', function() {
    var state = {};
    return { theSubscriber: state };
});

services.factory('Subscribers', ['$resource', function($resource){
    return $resource('/api/subscribers/:email', null,
        {
            'update': { method:'PUT' }
        });
}]);

services.factory('Teams', ['$resource', function($resource){
    return $resource('/api/teams', null);
}]);
